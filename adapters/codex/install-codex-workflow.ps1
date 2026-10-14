param(
  [string]$RepoRoot = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath))),
  [switch]$CreateDriveRootLinks,
  [switch]$OverwriteExistingDriveRootFiles,
  [string[]]$DriveLetters
)

$ErrorActionPreference = "Stop"

# Pure lexical guard: no path resolution or I/O, including for drive/UNC input.
function Assert-SkillName([string]$Name) {
  if ($Name -cnotmatch '\A[a-z0-9]+(?:-[a-z0-9]+)*\z') {
    throw "Invalid managed skill name: expected a lowercase hyphenated slug"
  }
  if ($Name -match '\A(?:con|prn|aux|nul|com[1-9]|lpt[1-9])\z') {
    throw "Invalid managed skill name: reserved device name"
  }
}

# Native metadata is required to resolve the physical home and count hard links
# without parsing localized fsutil output or relying on LinkType display data.
Add-Type -TypeDefinition @'
using System;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.Win32.SafeHandles;
public static class CodexInstallerMetadata {
  [StructLayout(LayoutKind.Sequential)]
  private struct FileInfo {
    public uint Attributes;
    public System.Runtime.InteropServices.ComTypes.FILETIME Creation, Access, Write;
    public uint Volume, SizeHigh, SizeLow, Links, IndexHigh, IndexLow;
  }
  [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
  private static extern SafeFileHandle CreateFileW(string name, uint access, uint share,
    IntPtr security, uint creation, uint flags, IntPtr template);
  [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
  private static extern uint GetFinalPathNameByHandleW(SafeFileHandle handle, StringBuilder name, uint size, uint flags);
  [DllImport("kernel32.dll", SetLastError=true)]
  private static extern bool GetFileInformationByHandle(SafeFileHandle handle, out FileInfo info);
  private static SafeFileHandle Open(string path) {
    var handle = CreateFileW(path, 0, 7, IntPtr.Zero, 3, 0x02000000, IntPtr.Zero);
    if (handle.IsInvalid) { handle.Dispose(); throw new Win32Exception(Marshal.GetLastWin32Error()); }
    return handle;
  }
  public static string PhysicalHome(string path) {
    using (var handle = Open(path)) {
      var buffer = new StringBuilder(32768);
      uint size = GetFinalPathNameByHandleW(handle, buffer, (uint)buffer.Capacity, 0);
      if (size == 0 || size >= buffer.Capacity) throw new Win32Exception(Marshal.GetLastWin32Error());
      string resolved = buffer.ToString();
      if (resolved.StartsWith(@"\\?\UNC\")) return @"\\" + resolved.Substring(8);
      if (resolved.StartsWith(@"\\?\")) return resolved.Substring(4);
      return resolved;
    }
  }
  public static uint LinkCount(string path) {
    using (var handle = Open(path)) {
      FileInfo info;
      if (!GetFileInformationByHandle(handle, out info)) throw new Win32Exception(Marshal.GetLastWin32Error());
      return info.Links;
    }
  }
}
'@

$physicalHome = [CodexInstallerMetadata]::PhysicalHome($HOME)
$codexHome = Join-Path $physicalHome ".codex"
$skillsHome = Join-Path $codexHome "skills"
$managedSkillsManifest = Join-Path $codexHome ".codex-workflow-bundle.managed-skills.txt"
$legacyManagedSkillsManifest = Join-Path $codexHome ".codex-workflow-pack.managed-skills.txt"
$globalAgentsSource = Join-Path $RepoRoot "policies\codex\AGENTS.global.md"
$globalAgentsDest = Join-Path $codexHome "AGENTS.global.md"
$skillsSourceRoot = Join-Path $RepoRoot "skills"

function Get-NodeAttributes([string]$Path) {
  try { return [System.IO.File]::GetAttributes($Path) }
  catch [System.IO.FileNotFoundException] { return $null }
  catch [System.IO.DirectoryNotFoundException] { return $null }
}
function Assert-Node([string]$Path, [bool]$Directory) {
  $attributes = Get-NodeAttributes $Path
  if ($null -eq $attributes) { return }
  if ($attributes -band [System.IO.FileAttributes]::ReparsePoint) {
    throw "Installer preflight failed: destination reparse point"
  }
  if ([bool]($attributes -band [System.IO.FileAttributes]::Directory) -ne $Directory) {
    throw "Installer preflight failed: destination node type"
  }
  if (-not $Directory -and [CodexInstallerMetadata]::LinkCount($Path) -ne 1) {
    throw "Installer preflight failed: multi-link output file"
  }
}
function Assert-RemovalTree([string]$Path) {
  Assert-Node $Path $true
  if ($null -eq (Get-NodeAttributes $Path)) { return }
  foreach ($child in @(Get-ChildItem -LiteralPath $Path -Force -ErrorAction Stop)) {
    if ($child.Attributes -band [System.IO.FileAttributes]::ReparsePoint) {
      throw "Installer preflight failed: reparse point in managed removal tree"
    }
    if ($child.PSIsContainer) { Assert-RemovalTree $child.FullName }
    elseif (-not ($child -is [System.IO.FileInfo])) { throw "Installer preflight failed: unsupported subtree node" }
  }
}

if (-not (Test-Path -LiteralPath $globalAgentsSource -PathType Leaf)) { throw "Missing policy source" }
if (-not (Test-Path -LiteralPath $skillsSourceRoot -PathType Container)) { throw "Missing skills source" }
Assert-Node $codexHome $true
Assert-Node $skillsHome $true
Assert-Node $globalAgentsDest $false
Assert-Node $managedSkillsManifest $false
Assert-Node $legacyManagedSkillsManifest $false

$previousManagedSkillNames = @()
$selectedManifest = $null
if ($null -ne (Get-NodeAttributes $managedSkillsManifest)) { $selectedManifest = $managedSkillsManifest }
elseif ($null -ne (Get-NodeAttributes $legacyManagedSkillsManifest)) { $selectedManifest = $legacyManagedSkillsManifest }
if ($selectedManifest) {
  $utf8 = New-Object System.Text.UTF8Encoding($false, $true)
  $manifestText = $utf8.GetString([System.IO.File]::ReadAllBytes($selectedManifest))
  if ($manifestText.Length -gt 0 -and $manifestText[0] -eq [char]0xFEFF) { $manifestText = $manifestText.Substring(1) }
  $seen = @{}
  $records = $manifestText.Split([char]10)
  for ($index = 0; $index -lt $records.Length; $index++) {
    $name = $records[$index]
    if ($index -lt $records.Length - 1 -and $name.EndsWith("`r")) { $name = $name.Substring(0, $name.Length - 1) }
    if ($name.Length -eq 0) { continue }
    Assert-SkillName $name
    if ($seen.ContainsKey($name)) { throw "Installer preflight failed: duplicate manifest name" }
    $seen[$name] = $true
    $previousManagedSkillNames += $name
  }
}

# Preserve duplicates until validation, before flattening the source inventory.
$skillDirs = @(Get-ChildItem -LiteralPath $skillsSourceRoot -Recurse -File -Force -Filter SKILL.md |
  ForEach-Object { $_.Directory } | Sort-Object FullName)
$skillNames = @()
$sourceNames = @{}
foreach ($skillDir in $skillDirs) {
  Assert-SkillName $skillDir.Name
  if ($sourceNames.ContainsKey($skillDir.Name)) { throw "Installer preflight failed: duplicate source basename" }
  $sourceNames[$skillDir.Name] = $true
  $skillNames += $skillDir.Name
  Assert-RemovalTree (Join-Path $skillsHome $skillDir.Name)
}
foreach ($name in $previousManagedSkillNames) { Assert-RemovalTree (Join-Path $skillsHome $name) }

# Mutation begins only after the complete manifest/source/topology preflight.
New-Item -ItemType Directory -Force -Path $skillsHome | Out-Null
Copy-Item -LiteralPath $globalAgentsSource -Destination $globalAgentsDest -Force
Write-Host "Installed global AGENTS to: $globalAgentsDest"
foreach ($skillDir in $skillDirs) {
  $skillDest = Join-Path $skillsHome $skillDir.Name
  if ($null -ne (Get-NodeAttributes $skillDest)) { Remove-Item -LiteralPath $skillDest -Recurse -Force }
  Copy-Item -LiteralPath $skillDir.FullName -Destination $skillDest -Recurse -Force
  Write-Host "Installed skill to: $skillDest"
}
foreach ($name in $previousManagedSkillNames) {
  if ($sourceNames.ContainsKey($name)) { continue }
  $staleSkillDest = Join-Path $skillsHome $name
  if ($null -ne (Get-NodeAttributes $staleSkillDest)) {
    Remove-Item -LiteralPath $staleSkillDest -Recurse -Force
    Write-Host "Removed stale managed skill: $staleSkillDest"
  }
}
[System.IO.File]::WriteAllLines($managedSkillsManifest, [string[]]$skillNames, (New-Object System.Text.UTF8Encoding($false)))
if ($null -ne (Get-NodeAttributes $legacyManagedSkillsManifest)) { Remove-Item -LiteralPath $legacyManagedSkillsManifest -Force }
Write-Host "Updated managed skills manifest: $managedSkillsManifest"

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
