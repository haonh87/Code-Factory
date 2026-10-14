#!/usr/bin/env bash
set -euo pipefail

# Names are validated before joining paths. Keep this function pure for lexical
# fixtures that must never resolve a drive or UNC path on the filesystem.
validate_skill_name() {
  local name="$1"
  if [[ ! "$name" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo 'Invalid managed skill name: expected a lowercase hyphenated slug' >&2
    return 1
  fi
  case "$name" in
    con|prn|aux|nul|com[1-9]|lpt[1-9]) echo 'Invalid managed skill name: reserved device name' >&2; return 1 ;;
  esac
}

fail_preflight() {
  echo "Installer preflight failed: $1" >&2
  exit 1
}

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)"
physical_home="$(cd "${HOME}" && pwd -P)"
codex_home="${physical_home}/.codex"
skills_home="${codex_home}/skills"
managed_skills_manifest="${codex_home}/.codex-workflow-bundle.managed-skills.txt"
legacy_managed_skills_manifest="${codex_home}/.codex-workflow-pack.managed-skills.txt"
global_agents_src="${repo_root}/policies/codex/AGENTS.global.md"
global_agents_dest="${codex_home}/AGENTS.global.md"
skills_src_root="${repo_root}/skills"

# lstat-style checks: -L also detects dangling links. Never walk an alias.
check_directory() {
  [[ ! -L "$1" ]] || fail_preflight 'directory alias'
  if [[ -e "$1" ]]; then
    [[ -d "$1" && -r "$1" && -x "$1" ]] || fail_preflight 'directory type or inspection access'
  fi
}
check_output_file() {
  local link_count
  [[ ! -L "$1" ]] || fail_preflight 'output file alias'
  if [[ -e "$1" ]]; then
    [[ -f "$1" && -r "$1" ]] || fail_preflight 'output file type or read access'
    if [[ "$(uname -s)" == Darwin ]]; then
      link_count="$(stat -f '%l' "$1")" || fail_preflight 'cannot inspect link count'
    else
      link_count="$(stat -c '%h' -- "$1")" || fail_preflight 'cannot inspect link count'
    fi
    [[ "$link_count" == 1 ]] || fail_preflight 'multi-link output file'
  fi
}
check_removed_tree() {
  local entry
  check_directory "$1"
  [[ -e "$1" ]] || return 0
  # Recursive Bash traversal propagates inspection failures, includes dotfiles,
  # and stops at links rather than following find/copy platform defaults.
  for entry in "$1"/* "$1"/.[!.]* "$1"/..?*; do
    [[ -e "$entry" || -L "$entry" ]] || continue
    [[ ! -L "$entry" ]] || fail_preflight 'alias in a managed removal tree'
    if [[ -d "$entry" ]]; then
      check_removed_tree "$entry"
    else
      [[ -f "$entry" ]] || fail_preflight 'unsupported managed subtree node'
    fi
  done
}

[[ -f "$global_agents_src" && -r "$global_agents_src" ]] || fail_preflight 'missing or unreadable policy source'
[[ -d "$skills_src_root" && -r "$skills_src_root" ]] || fail_preflight 'missing or unreadable skills source'
check_directory "$codex_home"
check_directory "$skills_home"
check_output_file "$global_agents_dest"
check_output_file "$managed_skills_manifest"
check_output_file "$legacy_managed_skills_manifest"

declare -a skill_files=()
declare -a skill_names=()
declare -a previous_managed_skill_names=()
selected_manifest=''
if [[ -e "$managed_skills_manifest" ]]; then
  selected_manifest="$managed_skills_manifest"
elif [[ -e "$legacy_managed_skills_manifest" ]]; then
  selected_manifest="$legacy_managed_skills_manifest"
fi
if [[ -n "$selected_manifest" ]]; then
  # Bash read discards NUL; reject it explicitly before parsing text records.
  manifest_bytes="$(od -An -v -t u1 "$selected_manifest")" || fail_preflight 'manifest read failure'
  for byte in $manifest_bytes; do
    [[ "$byte" != 0 ]] || fail_preflight 'NUL in manifest'
  done
  first_line=1
  while true; do
    line=''
    record_has_lf=0
    if IFS= read -r line; then
      record_has_lf=1
    elif [[ -z "$line" ]]; then
      break
    fi
    if (( first_line )); then
      line="${line#$'\xef\xbb\xbf'}"
      first_line=0
    fi
    if (( record_has_lf )); then line="${line%$'\r'}"; fi
    [[ -n "$line" ]] || continue
    validate_skill_name "$line" || exit 1
    if (( ${#previous_managed_skill_names[@]} > 0 )); then
      for previous in "${previous_managed_skill_names[@]}"; do
        [[ "$previous" != "$line" ]] || fail_preflight 'duplicate manifest name'
      done
    fi
    previous_managed_skill_names+=("$line")
  done < "$selected_manifest"
fi

# Capture command status, unlike a process substitution whose find failure is
# invisible to the parent. A newline-bearing source path fails before mutation.
inventory="$(find "$skills_src_root" -type f -name SKILL.md -print | LC_ALL=C sort)" || fail_preflight 'source inventory failure'
if [[ -n "$inventory" ]]; then
  while IFS= read -r skill_file; do
    [[ -f "$skill_file" && -r "$skill_file" ]] || fail_preflight 'invalid source inventory record'
    skill_src="$(dirname "$skill_file")"
    skill_name="$(basename "$skill_src")"
    validate_skill_name "$skill_name" || exit 1
    if (( ${#skill_names[@]} > 0 )); then
      for existing in "${skill_names[@]}"; do
        [[ "$existing" != "$skill_name" ]] || fail_preflight 'duplicate source basename'
      done
    fi
    skill_files+=("$skill_file")
    skill_names+=("$skill_name")
    check_removed_tree "${skills_home}/${skill_name}"
  done <<< "$inventory"
fi
if (( ${#previous_managed_skill_names[@]} > 0 )); then
  for previous in "${previous_managed_skill_names[@]}"; do
    check_removed_tree "${skills_home}/${previous}"
  done
fi

# Mutation phase: every target below is an immediate validated child or a fixed
# output node inspected above. No concurrent hostile writer is in this contract.
mkdir -p "$skills_home"
cp "$global_agents_src" "$global_agents_dest"
echo "Installed global AGENTS to: ${global_agents_dest}"
if (( ${#skill_files[@]} > 0 )); then
  for skill_file in "${skill_files[@]}"; do
    skill_src="$(dirname "$skill_file")"
    skill_name="$(basename "$skill_src")"
    skill_dest="${skills_home}/${skill_name}"
    rm -rf "$skill_dest"
    cp -R "$skill_src" "$skill_dest"
    echo "Installed skill to: ${skill_dest}"
  done
fi
if (( ${#previous_managed_skill_names[@]} > 0 )); then
  for stale_skill in "${previous_managed_skill_names[@]}"; do
    retained=0
    if (( ${#skill_names[@]} > 0 )); then
      for skill_name in "${skill_names[@]}"; do
        if [[ "$skill_name" == "$stale_skill" ]]; then retained=1; break; fi
      done
    fi
    (( retained )) && continue
    stale_skill_dest="${skills_home}/${stale_skill}"
    if [[ -d "$stale_skill_dest" ]]; then
      rm -rf "$stale_skill_dest"
      echo "Removed stale managed skill: ${stale_skill_dest}"
    fi
  done
fi
if (( ${#skill_names[@]} > 0 )); then
  printf '%s\n' "${skill_names[@]}" > "$managed_skills_manifest"
else
  : > "$managed_skills_manifest"
fi
if [[ -f "$legacy_managed_skills_manifest" ]]; then
  rm -f "$legacy_managed_skills_manifest"
fi
echo "Updated managed skills manifest: ${managed_skills_manifest}"
echo 'Done. Restart Codex sessions to load updated global policy and skills.'
