param(
  [string]$RepoRoot = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath))),
  [string]$CodexHome = (Join-Path $HOME ".codex"),
  [string]$AllowedRoot
)

$ErrorActionPreference = "Stop"

$resolvedRepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
$mcpRoot = Join-Path $resolvedRepoRoot "mcp\session-search"
$packageJson = Join-Path $mcpRoot "package.json"
$templatePath = Join-Path $mcpRoot "codex-config.toml.template"
$configPath = Join-Path $CodexHome "config.toml"
$mcpServerName = "session-search"

if (-not (Test-Path -LiteralPath $packageJson)) {
  throw "Missing package.json: $packageJson"
}

if (-not (Test-Path -LiteralPath $templatePath)) {
  throw "Missing template: $templatePath"
}

if (-not $AllowedRoot) {
  $AllowedRoot = $resolvedRepoRoot
}

$cassCommand = Get-Command cass -ErrorAction SilentlyContinue
if (-not $cassCommand) {
  throw "Missing cass in PATH. Install cass or set SESSION_SEARCH_CASS_BIN before using this MCP."
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

function Render-McpTemplate {
  param(
    [string[]]$Lines,
    [hashtable]$Values
  )

  $rendered = New-Object "System.Collections.Generic.List[string]"

  foreach ($line in $Lines) {
    $renderedLine = $line
    foreach ($key in $Values.Keys) {
      $renderedLine = $renderedLine.Replace("{{$key}}", $Values[$key])
    }
    $rendered.Add($renderedLine)
  }

  return $rendered
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

$managedComment = "# Managed by adapters/mcp/install-session-search"
$legacyManagedComments = @(
  $managedComment
  "# Managed by adapters/mcp/install-session-search.sh"
  "# Managed by adapters/mcp/install-session-search.ps1"
)
$filteredLines = @(Remove-McpServerBlock -Lines $configLines -ServerName $mcpServerName | Where-Object { $legacyManagedComments -notcontains $_ })
$updatedLines = New-Object "System.Collections.Generic.List[string]"
foreach ($line in $filteredLines) {
  $updatedLines.Add($line)
}
Trim-TrailingBlankLines -Lines $updatedLines | Out-Null
$templateLines = Get-Content -LiteralPath $templatePath
$managedBlock = @(
  $managedComment
)
$managedBlock += Render-McpTemplate -Lines $templateLines -Values @{
  SERVER_NAME = $mcpServerName
  ENTRY_POINT = $normalizedEntryPoint
  MCP_ROOT = $normalizedMcpRoot
  ALLOWED_ROOT = $normalizedAllowedRoot
}

if ($updatedLines.Count -gt 0) {
  $updatedLines.Add("")
}

foreach ($line in $managedBlock) {
  $updatedLines.Add($line)
}

Set-Content -LiteralPath $configPath -Value $updatedLines -Encoding utf8

Write-Host "Installed Session Search MCP dependencies in: $mcpRoot"
Write-Host "Updated Codex MCP config in: $configPath"
Write-Host "Registered MCP server '$mcpServerName' with allowed root: $resolvedAllowedRoot"
