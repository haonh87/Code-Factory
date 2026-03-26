#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: update-codex-workflow.sh [--repo-root PATH] [--codex-home PATH]

Updates Codex global policy and skills from the current repo into:
  $HOME/.codex

Options:
  --repo-root PATH   Override repository root.
  --codex-home PATH  Override Codex home. Default: $CODEX_HOME or $HOME/.codex
  -h, --help         Show this help.
EOF
}

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
codex_home="${CODEX_HOME:-${HOME}/.codex}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo-root)
      repo_root="$2"
      shift 2
      ;;
    --codex-home)
      codex_home="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

skills_home="${codex_home}/skills"
global_agents_src="${repo_root}/policies/codex/AGENTS.global.md"
global_agents_dest="${codex_home}/AGENTS.global.md"
skills_src_root="${repo_root}/skills"

if [[ ! -f "${global_agents_src}" ]]; then
  echo "Missing source file: ${global_agents_src}" >&2
  exit 1
fi
if [[ ! -d "${skills_src_root}" ]]; then
  echo "Missing skills folder: ${skills_src_root}" >&2
  exit 1
fi

mkdir -p "${codex_home}" "${skills_home}"

tmp_agents="${global_agents_dest}.tmp.$$"
cp "${global_agents_src}" "${tmp_agents}"
mv "${tmp_agents}" "${global_agents_dest}"
echo "Updated global AGENTS: ${global_agents_dest}"

while IFS= read -r skill_file; do
  skill_src="$(dirname "${skill_file}")"
  skill_name="$(basename "${skill_src}")"
  skill_dest="${skills_home}/${skill_name}"
  skill_tmp="${skills_home}/.${skill_name}.tmp.$$"

  rm -rf "${skill_tmp}"
  cp -R "${skill_src}" "${skill_tmp}"
  rm -rf "${skill_dest}"
  mv "${skill_tmp}" "${skill_dest}"

  echo "Updated skill: ${skill_dest}"
done < <(find "${skills_src_root}" -type f -name SKILL.md | sort)

cat <<EOF
Done. Restart Codex sessions to load updated global policy and skills.
If your machine uses copied root-level AGENTS.md files instead of symlinks, recopy them manually or rerun the full install flow.
EOF
