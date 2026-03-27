param(
  [string]$RepoRoot = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath)))
)

$ErrorActionPreference = "Stop"

$mcpRoot = Join-Path $RepoRoot "mcp\github-push"
$packageJson = Join-Path $mcpRoot "package.json"

if (-not (Test-Path $packageJson)) {
  throw "Missing package.json: $packageJson"
}

Push-Location $mcpRoot
try {
  npm install
}
finally {
  Pop-Location
}

Write-Host "Installed GitHub Push MCP dependencies in: $mcpRoot"
