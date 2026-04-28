#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-gitlab.sh [--repo-root PATH] [--codex-home PATH] [--allowed-root PATH] [--gitlab-host HOST]
EOF
}

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
codex_home="${CODEX_HOME:-${HOME}/.codex}"
allowed_root=""
gitlab_host="gitlab.ggg.com.vn"
server_name="gitlab"
managed_comment="# Managed by adapters/mcp/install-gitlab"

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
    --allowed-root)
      allowed_root="$2"
      shift 2
      ;;
    --gitlab-host)
      gitlab_host="$2"
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

mcp_root="${repo_root}/mcp/gitlab"
template_path="${mcp_root}/codex-config.toml.template"
config_path="${codex_home}/config.toml"

if [[ ! -f "${mcp_root}/package.json" ]]; then
  echo "Missing package.json: ${mcp_root}/package.json" >&2
  exit 1
fi

if [[ ! -f "${template_path}" ]]; then
  echo "Missing template: ${template_path}" >&2
  exit 1
fi

if [[ -z "${allowed_root}" ]]; then
  allowed_root="$(cd "${repo_root}/.." && pwd)"
fi

cd "${mcp_root}"
npm install

render_managed_block() {
  local entry_point line
  entry_point="${mcp_root}/src/index.js"

  printf '%s\n' "${managed_comment}"
  while IFS= read -r line || [[ -n "${line}" ]]; do
    line="${line//\{\{SERVER_NAME\}\}/${server_name}}"
    line="${line//\{\{ENTRY_POINT\}\}/${entry_point}}"
    line="${line//\{\{MCP_ROOT\}\}/${mcp_root}}"
    line="${line//\{\{ALLOWED_ROOT\}\}/${allowed_root}}"
    line="${line//\{\{GITLAB_HOST\}\}/${gitlab_host}}"
    printf '%s\n' "${line}"
  done < "${template_path}"
}

mkdir -p "${codex_home}"
touch "${config_path}"

tmp_config="${config_path}.tmp.$$"
awk -v server_name="${server_name}" '
BEGIN {
  target_header = "mcp_servers." server_name
  target_prefix = target_header "."
  skipping = 0
}
{
  if ($0 ~ /^\[[^]]+\][[:space:]]*$/) {
    header = substr($0, 2, length($0) - 2)
    if (header == target_header || index(header, target_prefix) == 1) {
      skipping = 1
      next
    }
    if (skipping == 1) {
      skipping = 0
    }
  }

  if (skipping == 0) {
    print $0
  }
}
' "${config_path}" | awk '$0 !~ /^# Managed by adapters\/mcp\/install-gitlab(\.sh|\.ps1)?$/' > "${tmp_config}"

if [[ -s "${tmp_config}" ]]; then
  printf '\n' >> "${tmp_config}"
fi

render_managed_block >> "${tmp_config}"

mv "${tmp_config}" "${config_path}"

echo "Installed GitLab MCP dependencies in: ${mcp_root}"
echo "Updated Codex MCP config in: ${config_path}"
echo "Registered MCP server '${server_name}' with allowed root: ${allowed_root} and host: ${gitlab_host}"
