param(
    [string]$RepoRoot = "."
)

$ErrorActionPreference = "Stop"

function Add-Check {
    param(
        [System.Collections.Generic.List[object]]$Checks,
        [string]$Id,
        [string]$Status,
        [string]$Evidence
    )

    $Checks.Add([pscustomobject]@{
        id = $Id
        status = $Status
        evidence = $Evidence
    }) | Out-Null
}

$repo = (Resolve-Path $RepoRoot).Path
$checks = [System.Collections.Generic.List[object]]::new()
$failCount = 0
$warnCount = 0

$skillsRoot = Join-Path $repo "skills"
$workflowChain = Join-Path $repo "skills\orchestration\codex-workflow-chain\references\workflow-chain.md"

if (-not (Test-Path $skillsRoot)) {
    throw "Missing skills root: $skillsRoot"
}

$skillFiles = Get-ChildItem -Path $skillsRoot -Recurse -Filter SKILL.md -File
if ($skillFiles.Count -eq 0) {
    throw "No SKILL.md files found under $skillsRoot"
}

Add-Check -Checks $checks -Id "skill_files_found" -Status "PASS" -Evidence ("Found {0} SKILL.md files" -f $skillFiles.Count)

$names = @{}
foreach ($file in $skillFiles) {
    $text = Get-Content -Raw -Encoding utf8 $file.FullName
    if ($text -notmatch "(?ms)^---\s*\nname:\s*([^\n]+)\ndescription:\s*([^\n]+)\n---") {
        Add-Check -Checks $checks -Id "frontmatter::$($file.FullName)" -Status "FAIL" -Evidence "Missing or invalid frontmatter"
        $failCount++
        continue
    }

    $name = $Matches[1].Trim()
    $folder = Split-Path -Leaf (Split-Path -Parent $file.FullName)
    Add-Check -Checks $checks -Id "frontmatter::$name" -Status "PASS" -Evidence "Frontmatter contains name and description"

    if ($folder -ne $name) {
        Add-Check -Checks $checks -Id "folder_name::$name" -Status "FAIL" -Evidence ("Folder '{0}' does not match frontmatter name '{1}'" -f $folder, $name)
        $failCount++
    } else {
        Add-Check -Checks $checks -Id "folder_name::$name" -Status "PASS" -Evidence "Folder name matches frontmatter name"
    }

    if ($names.ContainsKey($name)) {
        $names[$name] += @($file.FullName)
    } else {
        $names[$name] = @($file.FullName)
    }
}

$duplicateNames = $names.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }
if ($duplicateNames) {
    foreach ($dup in $duplicateNames) {
        Add-Check -Checks $checks -Id "skill_name_unique::$($dup.Key)" -Status "FAIL" -Evidence ("Duplicate skill name found in: {0}" -f ($dup.Value -join ", "))
        $failCount++
    }
} else {
    Add-Check -Checks $checks -Id "skill_name_unique" -Status "PASS" -Evidence "All skill names are unique across repo"
}

if (-not (Test-Path $workflowChain)) {
    Add-Check -Checks $checks -Id "workflow_chain_exists" -Status "FAIL" -Evidence "Missing workflow-chain reference file"
    $failCount++
} else {
    Add-Check -Checks $checks -Id "workflow_chain_exists" -Status "PASS" -Evidence $workflowChain
    $wc = Get-Content -Raw -Encoding utf8 $workflowChain

    $coreMarkerChecks = @(
        @{ Id = 'step-contract'; Pattern = '(?m)^## Step Contract\s*$' },
        @{ Id = 'artifact-main'; Pattern = '(?m)^## Artifact .*$' },
        @{ Id = 'audit'; Pattern = '(?m)^## Audit\s*$' },
        @{ Id = 'definition-of-ready'; Pattern = '(?m)^## Definition of Ready\s*$' },
        @{ Id = 'definition-of-done'; Pattern = '(?m)^## Definition of Done\s*$' },
        @{ Id = 'schema-implementation'; Pattern = '(?m)^### `implementation`\s*$' },
        @{ Id = 'schema-testing'; Pattern = '(?m)^### `testing`\s*$' },
        @{ Id = 'schema-code-scan-review'; Pattern = '(?m)^### `code-scan-review`\s*$' }
    )

    foreach ($markerCheck in $coreMarkerChecks) {
        if ($wc -match $markerCheck.Pattern) {
            Add-Check -Checks $checks -Id ("workflow_marker::{0}" -f $markerCheck.Id) -Status "PASS" -Evidence "Found marker in workflow-chain"
        } else {
            Add-Check -Checks $checks -Id ("workflow_marker::{0}" -f $markerCheck.Id) -Status "FAIL" -Evidence "Missing marker in workflow-chain"
            $failCount++
        }
    }

    $specializedMarkers = @{
        "frontend-experience-design" = @('`frontend-experience-design`', '### `frontend-experience-design`', '## Architecture Details')
        "react-web-implementation" = @('`react-web-implementation`', '### `react-web-implementation`', '## Implementation Notes')
        "frontend-quality-review" = @('`frontend-quality-review`', '### `frontend-quality-review`', '## Review Findings')
        "react-best-practices-review" = @('`react-best-practices-review`', '### `react-best-practices-review`', '## Review Findings')
    }

    foreach ($skillName in $specializedMarkers.Keys) {
        if (-not $names.ContainsKey($skillName)) {
            continue
        }

        foreach ($marker in $specializedMarkers[$skillName]) {
            if ($wc.Contains($marker)) {
                Add-Check -Checks $checks -Id ("workflow_specialized::{0}::{1}" -f $skillName, $marker) -Status "PASS" -Evidence "Found specialized marker"
            } else {
                Add-Check -Checks $checks -Id ("workflow_specialized::{0}::{1}" -f $skillName, $marker) -Status "FAIL" -Evidence "Missing specialized marker"
                $failCount++
            }
        }
    }

    $forbiddenFragments = @(
        '`eferences/',
        '`isks`'
    )

    foreach ($fragment in $forbiddenFragments) {
        if ($wc.Contains($fragment)) {
            Add-Check -Checks $checks -Id ("workflow_forbidden::{0}" -f $fragment) -Status "FAIL" -Evidence "Found suspicious broken fragment in workflow-chain"
            $failCount++
        } else {
            Add-Check -Checks $checks -Id ("workflow_forbidden::{0}" -f $fragment) -Status "PASS" -Evidence "Fragment not present"
        }
    }
}

$overall = if ($failCount -gt 0) { "FAIL" } elseif ($warnCount -gt 0) { "PARTIAL" } else { "PASS" }

Write-Host ("WORKFLOW_PACK_AUDIT={0}" -f $overall)
$checks | Sort-Object id | Format-Table -AutoSize

if ($failCount -gt 0) {
    exit 1
}
