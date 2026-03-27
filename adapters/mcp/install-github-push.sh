#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
mcp_root="${repo_root}/mcp/github-push"

if [[ ! -f "${mcp_root}/package.json" ]]; then
  echo "Missing package.json: ${mcp_root}/package.json" >&2
  exit 1
fi

cd "${mcp_root}"
npm install

echo "Installed GitHub Push MCP dependencies in: ${mcp_root}"
