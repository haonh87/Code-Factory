param(
  [string]$RepoRoot = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath))),
  [string]$CodexHome = (Join-Path $HOME ".codex"),
  [string]$UvxBin
)

$ErrorActionPreference = "Stop"

$resolvedRepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
$mcpRoot = Join-Path $resolvedRepoRoot "mcp\notebooklm"
$packageJson = Join-Path $mcpRoot "package.json"
$templatePath = Join-Path $mcpRoot "codex-config.toml.template"
$configPath = Join-Path $CodexHome "config.toml"
$mcpServerName = "notebooklm"

if (-not (Test-Path -LiteralPath $packageJson)) {
  throw "Missing package.json: $packageJson"
}

if (-not (Test-Path -LiteralPath $templatePath)) {
  throw "Missing template: $templatePath"
}

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCommand) {
  throw "Missing node in PATH. Install Node.js >=20 before using this MCP."
}

if (-not $UvxBin) {
  $uvxCommand = Get-Command uvx -ErrorAction SilentlyContinue
  if (-not $uvxCommand) {
    throw "Missing uvx in PATH. Install uv first, then rerun this installer."
  }
  $UvxBin = $uvxCommand.Source
}

if (-not (Test-Path -LiteralPath $UvxBin)) {
  throw "uvx binary not found: $UvxBin"
}

$normalizedMcpRoot = $mcpRoot -replace "\\", "/"
$normalizedEntryPoint = (Join-Path $mcpRoot "src\index.js") -replace "\\", "/"
$normalizedUvxBin = ((Resolve-Path -LiteralPath $UvxBin).Path) -replace "\\", "/"

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

New-Item -ItemType Directory -Force -Path $CodexHome | Out-Null

if (Test-Path -LiteralPath $configPath) {
  $configLines = Get-Content -LiteralPath $configPath
}
else {
  $configLines = @()
}

$managedComment = "# Managed by adapters/mcp/install-notebooklm"
$legacyManagedComments = @(
  $managedComment
  "# Managed by adapters/mcp/install-notebooklm.sh"
  "# Managed by adapters/mcp/install-notebooklm.ps1"
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
  UVX_BIN = $normalizedUvxBin
}

if ($updatedLines.Count -gt 0) {
  $updatedLines.Add("")
}

foreach ($line in $managedBlock) {
  $updatedLines.Add($line)
}

Set-Content -LiteralPath $configPath -Value $updatedLines -Encoding utf8

Write-Host "Updated Codex MCP config in: $configPath"
Write-Host "Registered MCP server '$mcpServerName' with uvx binary: $normalizedUvxBin"
Write-Host "Next step: run 'uvx --from notebooklm-mcp-cli nlm login' if NotebookLM auth is not set up yet."
