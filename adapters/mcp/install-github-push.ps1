param(
  [string]$RepoRoot = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath))),
  [string]$CodexHome = (Join-Path $HOME ".codex"),
  [string]$AllowedRoot
)

$ErrorActionPreference = "Stop"

$resolvedRepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
$mcpRoot = Join-Path $resolvedRepoRoot "mcp\github-push"
$packageJson = Join-Path $mcpRoot "package.json"
$configPath = Join-Path $CodexHome "config.toml"
$mcpServerName = "github-push"

if (-not (Test-Path $packageJson)) {
  throw "Missing package.json: $packageJson"
}

if (-not $AllowedRoot) {
  $AllowedRoot = Split-Path -Parent $resolvedRepoRoot
}

$resolvedAllowedRoot = (Resolve-Path -LiteralPath $AllowedRoot).Path
$normalizedMcpRoot = $mcpRoot -replace "\\", "/"
$normalizedEntryPoint = (Join-Path $mcpRoot "src\index.js") -replace "\\", "/"
$normalizedAllowedRoot = $resolvedAllowedRoot -replace "\\", "/"

function Remove-McpServerBlock {
  param(
    [string[]]$Lines,
    [string]$ServerName
  )

  $targetHeader = "mcp_servers.$ServerName"
  $targetPrefix = "$targetHeader."
  $result = New-Object "System.Collections.Generic.List[string]"
  $skipping = $false

  foreach ($line in $Lines) {
    if ($line -match "^\[(?<header>[^\]]+)\]\s*$") {
      $header = $matches["header"]
      $isTargetHeader = $header -eq $targetHeader -or $header.StartsWith($targetPrefix)

      if ($isTargetHeader) {
        $skipping = $true
        continue
      }

      if ($skipping) {
        $skipping = $false
      }
    }

    if (-not $skipping) {
      $result.Add($line)
    }
  }

  return $result
}

function Trim-TrailingBlankLines {
  param(
    [System.Collections.Generic.List[string]]$Lines
  )

  while ($Lines.Count -gt 0 -and [string]::IsNullOrWhiteSpace($Lines[$Lines.Count - 1])) {
    $Lines.RemoveAt($Lines.Count - 1)
  }

  return $Lines
}

Push-Location $mcpRoot
try {
  npm install
}
finally {
  Pop-Location
}

New-Item -ItemType Directory -Force -Path $CodexHome | Out-Null

if (Test-Path -LiteralPath $configPath) {
  $configLines = Get-Content -LiteralPath $configPath
}
else {
  $configLines = @()
}

$managedComment = "# Managed by adapters/mcp/install-github-push.ps1"
$filteredLines = @(Remove-McpServerBlock -Lines $configLines -ServerName $mcpServerName | Where-Object { $_ -ne $managedComment })
$updatedLines = New-Object "System.Collections.Generic.List[string]"
foreach ($line in $filteredLines) {
  $updatedLines.Add($line)
}
Trim-TrailingBlankLines -Lines $updatedLines | Out-Null
$managedBlock = @(
  $managedComment
  "[mcp_servers.$mcpServerName]"
  'command = "node"'
  "args = [`"$normalizedEntryPoint`"]"
  "cwd = `"$normalizedMcpRoot`""
  "env = { GITHUB_PUSH_ALLOWED_ROOT = `"$normalizedAllowedRoot`" }"
  'env_vars = ["GITHUB_TOKEN", "GITHUB_USERNAME"]'
)

if ($updatedLines.Count -gt 0) {
  $updatedLines.Add("")
}

foreach ($line in $managedBlock) {
  $updatedLines.Add($line)
}

Set-Content -LiteralPath $configPath -Value $updatedLines -Encoding utf8

Write-Host "Installed GitHub Push MCP dependencies in: $mcpRoot"
Write-Host "Updated Codex MCP config in: $configPath"
Write-Host "Registered MCP server '$mcpServerName' with allowed root: $resolvedAllowedRoot"


