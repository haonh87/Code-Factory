param(
  [string]$RepoRoot = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath))),
  [switch]$CreateDriveRootLinks,
  [switch]$OverwriteExistingDriveRootFiles,
  [string[]]$DriveLetters
)

$ErrorActionPreference = "Stop"

$codexHome = Join-Path $HOME ".codex"
$skillsHome = Join-Path $codexHome "skills"
$globalAgentsSource = Join-Path $RepoRoot "policies\codex\AGENTS.global.md"
$globalAgentsDest = Join-Path $codexHome "AGENTS.global.md"
$skillsSourceRoot = Join-Path $RepoRoot "skills"

if (-not (Test-Path $globalAgentsSource)) {
  throw "Missing source file: $globalAgentsSource"
}
if (-not (Test-Path $skillsSourceRoot)) {
  throw "Missing skills folder: $skillsSourceRoot"
}

New-Item -ItemType Directory -Force -Path $codexHome | Out-Null
New-Item -ItemType Directory -Force -Path $skillsHome | Out-Null

Copy-Item -Path $globalAgentsSource -Destination $globalAgentsDest -Force

Write-Host "Installed global AGENTS to: $globalAgentsDest"

$skillDirs = Get-ChildItem -Path $skillsSourceRoot -Recurse -Filter SKILL.md |
  ForEach-Object { $_.Directory } |
  Sort-Object FullName -Unique

foreach ($skillDir in $skillDirs) {
  $skillDest = Join-Path $skillsHome $skillDir.Name
  if (Test-Path $skillDest) {
    Remove-Item -Path $skillDest -Recurse -Force
  }
  Copy-Item -Path $skillDir.FullName -Destination $skillDest -Recurse -Force
  Write-Host "Installed skill to: $skillDest"
}

if ($CreateDriveRootLinks) {
  if ($DriveLetters -and $DriveLetters.Count -gt 0) {
    $targetDrives = $DriveLetters
  }
  else {
    $targetDrives = Get-PSDrive -PSProvider FileSystem |
      Where-Object { $_.Root -match "^[A-Za-z]:\\$" } |
      Sort-Object Name |
      Select-Object -ExpandProperty Name
  }

  if (-not $targetDrives -or $targetDrives.Count -eq 0) {
    Write-Warning "No filesystem drives found for global AGENTS.md links."
  }

  foreach ($drive in $targetDrives) {
    $root = "${drive}:\"
    if (-not (Test-Path $root)) {
      Write-Warning "Skip drive ${drive}: root not found"
      continue
    }

    $linkPath = Join-Path $root "AGENTS.md"
    if (Test-Path $linkPath) {
      if (-not $OverwriteExistingDriveRootFiles) {
        Write-Warning "Skip $linkPath because it already exists"
        continue
      }

      $existingItem = Get-Item -LiteralPath $linkPath -Force
      $existingTarget = @($existingItem.Target)
      if ($existingItem.LinkType -eq "SymbolicLink" -and $existingTarget.Count -eq 1 -and $existingTarget[0] -eq $globalAgentsDest) {
        Write-Host "Keep existing symlink: $linkPath -> $globalAgentsDest"
        continue
      }

      Remove-Item -LiteralPath $linkPath -Force
    }

    try {
      New-Item -ItemType SymbolicLink -Path $linkPath -Target $globalAgentsDest | Out-Null
      Write-Host "Created symlink: $linkPath -> $globalAgentsDest"
    }
    catch {
      try {
        Copy-Item -Path $globalAgentsDest -Destination $linkPath -Force
        Write-Warning "Cannot create symlink at $linkPath. Copied AGENTS.md instead."
      }
      catch {
        Write-Warning "Cannot create or copy AGENTS.md at $linkPath. Run PowerShell as Administrator or create manually."
      }
    }
  }
}

Write-Host "Done. Restart Codex sessions to load updated global policy and skills."
