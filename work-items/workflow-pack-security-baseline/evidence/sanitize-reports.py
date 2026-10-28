"""Allowlist scanner evidence. Source snippets/messages/fixes/metavariables never leave raw scratch."""
import hashlib,json,re
from pathlib import PurePosixPath

def sanitize_semgrep(report, manifest, path_map=None):
    files={r['path']:r for r in manifest['files']}; rows=[]
    for index,r in enumerate(report.get('results',[])):
        p=r['path'].removeprefix('/input/')
        if path_map is not None:p=path_map[p]
        if p not in files or PurePosixPath(p).is_absolute() or '..' in PurePosixPath(p).parts:raise ValueError('Unmanifested evidence path')
        rule=r['check_id']
        if not re.fullmatch(r'[a-zA-Z0-9_.-]+',rule):raise ValueError('Invalid rule id')
        start=r['start'];end=r['end'];line=int(start['line']);column=int(start['col'])
        if line<1 or column<1:raise ValueError('Invalid location')
        key=json.dumps([rule,p,start.get('offset'),end.get('offset'),index])
        rows.append({'id':'SG-'+hashlib.sha256(key.encode()).hexdigest()[:16],'rule':rule,'path':p,'line':line,'column':column,'source_sha256':files[p]['sha256'],'severity':'MEDIUM','confidence':'LOW','disposition':'OPEN_CONTEXT_REVIEW','owner':'developer','review_owner':'qc','preconditions':'Attacker must control a function argument reaching this path operation and cross a filesystem authority boundary; the rule alone does not establish either.','rationale':'Retained taint advisory. Inspect caller provenance, containment and symlink semantics; no false-positive dismissal or suppression has been applied.'})
    return rows

def self_test():
    secret='SYNTHETIC_SECRET_DO_NOT_EXPORT'; private='/private-example/credential.txt'
    manifest={'files':[{'path':'scripts/example.js','sha256':'0'*64}]}
    raw={'results':[{'check_id':'path-rule','path':'/input/scripts/example.js','start':{'line':1,'col':1,'offset':0},'end':{'offset':4},'extra':{'lines':secret,'message':private,'metavars':{'x':secret}},'fix':secret}]}
    output=json.dumps(sanitize_semgrep(raw,manifest));assert secret not in output and private not in output and 'metavars' not in output
    for bad in [private,'/input/../credential.txt','/input/untracked.js']:
        raw['results'][0]['path']=bad
        try:sanitize_semgrep(raw,manifest)
        except ValueError:pass
        else:raise AssertionError('Unmanifested path accepted')
    return {'allowlist_redaction':'PASS','private_path_rejection':'PASS','untracked_path_rejection':'PASS','traversal_rejection':'PASS'}
if __name__=='__main__':print(json.dumps(self_test()))
