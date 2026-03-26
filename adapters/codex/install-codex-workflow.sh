#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
codex_home="${HOME}/.codex"
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

mkdir -p "${skills_home}"
cp "${global_agents_src}" "${global_agents_dest}"

echo "Installed global AGENTS to: ${global_agents_dest}"
while IFS= read -r skill_file; do
  skill_src="$(dirname "${skill_file}")"
  skill_name="$(basename "${skill_src}")"
  skill_dest="${skills_home}/${skill_name}"
  rm -rf "${skill_dest}"
  cp -R "${skill_src}" "${skill_dest}"
  echo "Installed skill to: ${skill_dest}"
done < <(find "${skills_src_root}" -type f -name SKILL.md | sort)
echo "Done. Restart Codex sessions to load updated global policy and skills."
