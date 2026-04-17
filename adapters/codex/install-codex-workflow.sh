#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
codex_home="${HOME}/.codex"
skills_home="${codex_home}/skills"
managed_skills_manifest="${codex_home}/.codex-workflow-bundle.managed-skills.txt"
legacy_managed_skills_manifest="${codex_home}/.codex-workflow-pack.managed-skills.txt"

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
declare -a skill_files=()
declare -a skill_names=()
declare -a previous_managed_skill_names=()

if [[ -f "${managed_skills_manifest}" ]]; then
  while IFS= read -r line || [[ -n "${line}" ]]; do
    previous_managed_skill_names+=("${line}")
  done < "${managed_skills_manifest}"
elif [[ -f "${legacy_managed_skills_manifest}" ]]; then
  while IFS= read -r line || [[ -n "${line}" ]]; do
    previous_managed_skill_names+=("${line}")
  done < "${legacy_managed_skills_manifest}"
fi

while IFS= read -r line || [[ -n "${line}" ]]; do
  skill_files+=("${line}")
done < <(find "${skills_src_root}" -type f -name SKILL.md | sort)

for skill_file in "${skill_files[@]}"; do
  skill_src="$(dirname "${skill_file}")"
  skill_name="$(basename "${skill_src}")"
  skill_dest="${skills_home}/${skill_name}"
  skill_names+=("${skill_name}")
  rm -rf "${skill_dest}"
  cp -R "${skill_src}" "${skill_dest}"
  echo "Installed skill to: ${skill_dest}"
done

if (( ${#previous_managed_skill_names[@]} > 0 )); then
  for stale_skill in "${previous_managed_skill_names[@]}"; do
    [[ -z "${stale_skill}" ]] && continue
    if printf '%s\n' "${skill_names[@]}" | grep -Fxq -- "${stale_skill}"; then
      continue
    fi

    stale_skill_dest="${skills_home}/${stale_skill}"
    if [[ -d "${stale_skill_dest}" ]]; then
      rm -rf "${stale_skill_dest}"
      echo "Removed stale managed skill: ${stale_skill_dest}"
    fi
  done
fi

printf '%s\n' "${skill_names[@]}" > "${managed_skills_manifest}"
if [[ -f "${legacy_managed_skills_manifest}" ]]; then
  rm -f "${legacy_managed_skills_manifest}"
fi
echo "Updated managed skills manifest: ${managed_skills_manifest}"
echo "Done. Restart Codex sessions to load updated global policy and skills."
