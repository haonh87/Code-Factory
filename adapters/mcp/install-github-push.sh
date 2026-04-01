#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-github-push.sh [--repo-root PATH] [--codex-home PATH] [--allowed-root PATH]

Installs dependencies for the GitHub Push MCP and registers it in Codex config:
  $HOME/.codex/config.toml

Options:
  --repo-root PATH    Override repository root.
  --codex-home PATH   Override Codex home. Default: $CODEX_HOME or $HOME/.codex
  --allowed-root PATH Override GITHUB_PUSH_ALLOWED_ROOT. Default: parent of repo root.
  -h, --help          Show this help.
EOF
}

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
codex_home="${CODEX_HOME:-${HOME}/.codex}"
allowed_root=""
server_name="github-push"
managed_comment="# Managed by adapters/mcp/install-github-push.sh"

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

mcp_root="${repo_root}/mcp/github-push"
config_path="${codex_home}/config.toml"

if [[ ! -f "${mcp_root}/package.json" ]]; then
  echo "Missing package.json: ${mcp_root}/package.json" >&2
  exit 1
fi

if [[ -z "${allowed_root}" ]]; then
  allowed_root="$(cd "${repo_root}/.." && pwd)"
fi

cd "${mcp_root}"
npm install

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
' "${config_path}" | awk -v managed_comment="${managed_comment}" '$0 != managed_comment' > "${tmp_config}"

if [[ -s "${tmp_config}" ]]; then
  printf '\n' >> "${tmp_config}"
fi

cat >> "${tmp_config}" <<EOF
${managed_comment}
[mcp_servers.${server_name}]
command = "node"
args = ["${mcp_root}/src/index.js"]
cwd = "${mcp_root}"
env = { GITHUB_PUSH_ALLOWED_ROOT = "${allowed_root}" }
env_vars = ["GITHUB_TOKEN", "GITHUB_USERNAME"]
EOF

mv "${tmp_config}" "${config_path}"

echo "Installed GitHub Push MCP dependencies in: ${mcp_root}"
echo "Updated Codex MCP config in: ${config_path}"
echo "Registered MCP server '${server_name}' with allowed root: ${allowed_root}"
