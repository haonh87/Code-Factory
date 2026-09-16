// Review-only timing canary. Run from the RCR worktree root.
// Creates only a fresh /private/tmp fixture; never edits real workflow authority.
// Expected exit 1 at the historical failure source; exit 0 after ownership repair.
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto"),assert=require("node:assert/strict");
const {executeApprovalTransaction,getApprovalTransactionPaths}=require(path.resolve("packages/workflow-bundle/scripts/workflow-approval-transaction"));
const fixture=fs.mkdtempSync("/private/tmp/cf-rcr-sb3-lock-review-"),transactionRoot=path.join(fixture,"transactions"),target=path.join(fixture,"state.json"),before="before\n";
fs.writeFileSync(target,before);fs.mkdirSync(transactionRoot);
const paths=getApprovalTransactionPaths({transaction_root:transactionRoot,work_item_slug:"lock-review-item"});
const contenderId="a1335a13-5c90-4dc4-b851-bd14793f7c5f",winnerId="b2335a13-5c90-4dc4-b851-bd14793f7c5f";
const nativeOpen=fs.openSync;let injected=0,caught;
fs.openSync=function(file,flags,...rest){
if(path.resolve(String(file))===paths.lock_path && flags==="wx"){
injected++;const fd=nativeOpen(paths.lock_path,"wx");fs.writeFileSync(fd,JSON.stringify({schema_version:1,transaction_id:winnerId,pid:process.pid,started_at:new Date().toISOString()}));fs.closeSync(fd);
}
return nativeOpen(file,flags,...rest);
};
try{executeApprovalTransaction({plan:{work_item_slug:"lock-review-item",phase:"closeout",decision:"APPROVED",gates:[{gate:"dod",reviewer_role:"qc",artifact_digest:"sha256:fixture",consequence:"fixture"}]},transaction_root:transactionRoot,transaction_id:contenderId,operations:[{id:"state:fixture",target_path:target,expected_sha256:crypto.createHash("sha256").update(before).digest("hex"),content:"after\n"}]});}catch(error){caught=error;}finally{fs.openSync=nativeOpen;}
assert.equal(injected,1);assert.equal(caught.code,"EEXIST");assert.equal(fs.readFileSync(target,"utf8"),before);assert(!fs.existsSync(paths.journal_path));
const result={historical_failure_source_sha:"08a3d12e5482a6aa40cfc5b40318ab965626db31",executed_module_sha256:crypto.createHash("sha256").update(fs.readFileSync(path.resolve("packages/workflow-bundle/scripts/workflow-approval-transaction.js"))).digest("hex"),scenario:"Competing transaction acquires real wx lock between last existence check and losing wx open",injection:"Only timing at native openSync; EEXIST comes from native filesystem",contender_transaction_id:contenderId,winner_transaction_id:winnerId,winner_pid:process.pid,winner_pid_live:true,loser_error_code:caught.code,winner_lock_preserved:fs.existsSync(paths.lock_path),target_unchanged:true,loser_journal_absent:true,fixture,contract_expectation:"A transaction which failed lock acquisition must not remove another transaction's live lock"};
console.log(JSON.stringify(result));
assert.equal(result.winner_lock_preserved,true,"A contender which never acquired its wx lock must preserve the foreign live lock");
