param(
    [Parameter(Mandatory = $true)]
    [string]$WorkflowRoot,

    [Parameter(Mandatory = $false)]
    [string]$ProjectRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$resolvedWorkflowRoot = (Resolve-Path -LiteralPath $WorkflowRoot).Path
$resolvedProjectRoot = (Resolve-Path -LiteralPath $ProjectRoot).Path
$registerPath = Join-Path $resolvedProjectRoot "project-context/governance-exception-register.md"

$filePattern = '^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$'
$allowedProfiles = @("default", "strict", "regulated", "custom")
$allowedStatuses = @(
    "ALIGNED",
    "CHECKS_PENDING",
    "EXCEPTION_RECORDED",
    "WAIVER_APPROVED",
    "BLOCKED",
    "NOT_APPLICABLE"
)

$defaultGovernanceRef = "project-context/project-context.md"
$allowedStandardGovernanceRefs = @(
    "project-context/project-context.md",
    "project-context/constitution.md"
)

$expectedChecklistByProfile = @{
    "default" = "project-context/checklists/default.md"
    "strict" = "project-context/checklists/strict.md"
    "regulated" = "project-context/checklists/regulated.md"
}

$requiredBlocksByStep = @{
    "s01" = @("## Governance Context")
    "s04" = @("## Governance Checks")
    "s06" = @("## Governance Checks")
    "s08" = @("## Governance Checks")
}

$errors = New-Object "System.Collections.Generic.List[string]"
$matchedFiles = 0
$registerContent = ""

if (Test-Path -LiteralPath $registerPath) {
    $registerContent = Get-Content -LiteralPath $registerPath -Raw
}

function Get-FrontmatterLines {
    param(
        [string]$FilePath
    )

    $lines = Get-Content -LiteralPath $FilePath -TotalCount 160
    if ($lines.Count -lt 3 -or $lines[0].Trim() -ne "---") {
        return $null
    }

    $closingIndex = -1
    for ($index = 1; $index -lt $lines.Count; $index++) {
        if ($lines[$index].Trim() -eq "---") {
            $closingIndex = $index
            break
        }
    }

    if ($closingIndex -lt 1) {
        return $null
    }

    return $lines[1..($closingIndex - 1)]
}

function Normalize-YamlScalar {
    param(
        [string]$Value
    )

    if ($null -eq $Value) {
        return $null
    }

    $trimmed = $Value.Trim()
    if (
        ($trimmed.StartsWith('"') -and $trimmed.EndsWith('"')) -or
        ($trimmed.StartsWith("'") -and $trimmed.EndsWith("'"))
    ) {
        return $trimmed.Substring(1, $trimmed.Length - 2).Trim()
    }

    return $trimmed
}

function Get-FrontmatterValue {
    param(
        [string[]]$FrontmatterLines,
        [string]$Key
    )

    $escapedKey = [regex]::Escape($Key)
    foreach ($line in $FrontmatterLines) {
        if ($line -match "^${escapedKey}:\s*(?<value>.+?)\s*$") {
            return Normalize-YamlScalar -Value $matches["value"]
        }
    }

    return $null
}

function Get-FrontmatterList {
    param(
        [string[]]$FrontmatterLines,
        [string]$Key
    )

    $escapedKey = [regex]::Escape($Key)

    for ($index = 0; $index -lt $FrontmatterLines.Count; $index++) {
        $line = $FrontmatterLines[$index]

        if ($line -match "^${escapedKey}:\s*\[(?<inline>.*)\]\s*$") {
            $inlineValue = $matches["inline"].Trim()
            if ([string]::IsNullOrWhiteSpace($inlineValue)) {
                return @()
            }

            $items = New-Object "System.Collections.Generic.List[string]"
            foreach ($part in ($inlineValue -split ",")) {
                $normalized = Normalize-YamlScalar -Value $part
                if (-not [string]::IsNullOrWhiteSpace($normalized)) {
                    $items.Add($normalized)
                }
            }

            return $items.ToArray()
        }

        if ($line -match "^${escapedKey}:\s*$") {
            $items = New-Object "System.Collections.Generic.List[string]"
            for ($next = $index + 1; $next -lt $FrontmatterLines.Count; $next++) {
                $candidate = $FrontmatterLines[$next]

                if ($candidate -match '^\s*-\s*(?<value>.+?)\s*$') {
                    $normalized = Normalize-YamlScalar -Value $matches["value"]
                    if (-not [string]::IsNullOrWhiteSpace($normalized)) {
                        $items.Add($normalized)
                    }
                    continue
                }

                if ($candidate -match '^\s*#' -or $candidate -match '^\s*$') {
                    continue
                }

                break
            }

            return $items.ToArray()
        }
    }

    return $null
}

function Require-Block {
    param(
        [string]$FileContent,
        [string]$BlockHeading,
        [string]$FilePath
    )

    $pattern = "(?m)^" + [regex]::Escape($BlockHeading) + "\s*$"
    if ($FileContent -notmatch $pattern) {
        $errors.Add("Missing required block '$BlockHeading': $FilePath")
    }
}

function Get-ExceptionIds {
    param(
        [string]$FileContent
    )

    $ids = New-Object "System.Collections.Generic.List[string]"
    $matches = [regex]::Matches($FileContent, '(?m)^\s*exception_id:\s*["'']?(?<id>[A-Z0-9-]+)["'']?\s*$')
    foreach ($match in $matches) {
        $ids.Add($match.Groups["id"].Value)
    }
    return $ids.ToArray()
}

function Has-NonEmptyFieldValue {
    param(
        [string]$FileContent,
        [string]$FieldName
    )

    $pattern = "(?m)^\s*" + [regex]::Escape($FieldName) + ':\s*["'']?(?<value>[^"'']+?)["'']?\s*$'
    if ($FileContent -match $pattern) {
        return -not [string]::IsNullOrWhiteSpace($matches["value"].Trim())
    }

    return $false
}

function Should-RequireRegister {
    param(
        [string]$StepId,
        [string]$GovernanceProfile,
        [string]$GovernanceStatus
    )

    if ($GovernanceStatus -notin @("EXCEPTION_RECORDED", "WAIVER_APPROVED")) {
        return $false
    }

    if ($GovernanceProfile -eq "regulated") {
        return $true
    }

    if ($GovernanceStatus -eq "WAIVER_APPROVED") {
        return $true
    }

    return $StepId -eq "s08"
}

$files = Get-ChildItem -LiteralPath $resolvedWorkflowRoot -File -Recurse -Filter "*.md"

foreach ($file in $files) {
    if ($file.Name -notmatch $filePattern) {
        continue
    }

    $matchedFiles++
    $stepId = $matches["step_id"]
    $frontmatterLines = Get-FrontmatterLines -FilePath $file.FullName
    if ($null -eq $frontmatterLines) {
        $errors.Add("Missing or invalid YAML frontmatter: $($file.FullName)")
        continue
    }

    $content = Get-Content -LiteralPath $file.FullName -Raw
    $governanceRef = Get-FrontmatterValue -FrontmatterLines $frontmatterLines -Key "governance_ref"
    $governanceProfile = Get-FrontmatterValue -FrontmatterLines $frontmatterLines -Key "governance_profile"
    $governanceStatus = Get-FrontmatterValue -FrontmatterLines $frontmatterLines -Key "governance_status"
    $checklistRefs = Get-FrontmatterList -FrontmatterLines $frontmatterLines -Key "checklist_refs"

    if ([string]::IsNullOrWhiteSpace($governanceRef)) {
        $errors.Add("Missing governance_ref: $($file.FullName)")
    }
    elseif ($governanceProfile -eq "custom") {
        if ($governanceRef -notmatch '^project-context\/') {
            $errors.Add("Custom governance_ref must still trace into project-context/: $($file.FullName)")
        }
    }
    elseif ($governanceRef -notin $allowedStandardGovernanceRefs) {
        $errors.Add("Invalid governance_ref '$governanceRef' in $($file.FullName). Expected one of: $($allowedStandardGovernanceRefs -join ', ')")
    }

    if ([string]::IsNullOrWhiteSpace($governanceProfile)) {
        $errors.Add("Missing governance_profile: $($file.FullName)")
    }
    elseif ($governanceProfile -notin $allowedProfiles) {
        $errors.Add("Invalid governance_profile '$governanceProfile' in $($file.FullName)")
    }

    if ([string]::IsNullOrWhiteSpace($governanceStatus)) {
        $errors.Add("Missing governance_status: $($file.FullName)")
    }
    elseif ($governanceStatus -notin $allowedStatuses) {
        $errors.Add("Invalid governance_status '$governanceStatus' in $($file.FullName)")
    }

    if ($null -eq $checklistRefs) {
        $errors.Add("Missing checklist_refs: $($file.FullName)")
        $checklistRefs = @()
    }

    if ($governanceProfile -in @("default", "strict", "regulated")) {
        $expectedChecklist = $expectedChecklistByProfile[$governanceProfile]
        if ($checklistRefs -notcontains $expectedChecklist) {
            $errors.Add("Checklist ref '$expectedChecklist' is required for governance_profile '$governanceProfile': $($file.FullName)")
        }
    }
    elseif ($governanceProfile -eq "custom" -and $checklistRefs.Count -lt 1) {
        $errors.Add("Custom governance_profile requires at least one checklist ref: $($file.FullName)")
    }

    if ($requiredBlocksByStep.ContainsKey($stepId)) {
        foreach ($requiredBlock in $requiredBlocksByStep[$stepId]) {
            Require-Block -FileContent $content -BlockHeading $requiredBlock -FilePath $file.FullName
        }
    }

    $exceptionRequired = $governanceStatus -in @("EXCEPTION_RECORDED", "WAIVER_APPROVED")
    $exceptionIds = Get-ExceptionIds -FileContent $content

    if ($exceptionRequired) {
        Require-Block -FileContent $content -BlockHeading "## Governance Exceptions" -FilePath $file.FullName

        if ($exceptionIds.Count -lt 1) {
            $errors.Add("governance_status '$governanceStatus' requires at least one exception_id: $($file.FullName)")
        }
    }

    if ($governanceStatus -eq "WAIVER_APPROVED") {
        if (-not (Has-NonEmptyFieldValue -FileContent $content -FieldName "approved_by")) {
            $errors.Add("WAIVER_APPROVED requires non-empty approved_by: $($file.FullName)")
        }

        if (-not (Has-NonEmptyFieldValue -FileContent $content -FieldName "review_date")) {
            $errors.Add("WAIVER_APPROVED requires non-empty review_date: $($file.FullName)")
        }
    }

    if (Should-RequireRegister -StepId $stepId -GovernanceProfile $governanceProfile -GovernanceStatus $governanceStatus) {
        if (-not (Test-Path -LiteralPath $registerPath)) {
            $errors.Add("Missing governance exception register at expected path: $registerPath")
        }
        else {
            foreach ($exceptionId in $exceptionIds) {
                if ($registerContent -notmatch [regex]::Escape($exceptionId)) {
                    $errors.Add("Exception '$exceptionId' must appear in governance-exception-register.md: $($file.FullName)")
                }
            }
        }
    }
}

if ($errors.Count -gt 0) {
    foreach ($errorLine in $errors) {
        Write-Host "ERROR: $errorLine"
    }

    exit 1
}

Write-Host "OK: validated governance for $matchedFiles workflow note files under $resolvedWorkflowRoot"
