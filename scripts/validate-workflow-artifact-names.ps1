param(
    [Parameter(Mandatory = $true)]
    [string]$WorkflowRoot
)

$ErrorActionPreference = "Stop"

$resolvedRoot = (Resolve-Path -LiteralPath $WorkflowRoot).Path
$extensions = @(".md", ".canvas", ".base")
$allowedByStep = @{
    "s01" = @(@{ Slug = "restate"; Extension = "md" })
    "s02" = @(@{ Slug = "business-goal"; Extension = "md" })
    "s03" = @(@{ Slug = "open-questions"; Extension = "md" })
    "s04" = @(@{ Slug = "acceptance-criteria"; Extension = "md" })
    "s05" = @(
        @{ Slug = "technical-approach"; Extension = "md" }
        @{ Slug = "architecture"; Extension = "canvas" }
    )
    "s06" = @(
        @{ Slug = "task-breakdown"; Extension = "md" }
        @{ Slug = "task-map"; Extension = "canvas" }
        @{ Slug = "task-dashboard"; Extension = "base" }
    )
    "s07" = @(@{ Slug = "implementation"; Extension = "md" })
    "s08" = @(
        @{ Slug = "verification"; Extension = "md" }
        @{ Slug = "verification-dashboard"; Extension = "base" }
    )
}

$allowedKeys = New-Object "System.Collections.Generic.HashSet[string]" ([System.StringComparer]::OrdinalIgnoreCase)
foreach ($step in $allowedByStep.Keys) {
    foreach ($entry in $allowedByStep[$step]) {
        [void]$allowedKeys.Add("$step.$($entry.Slug).$($entry.Extension)")
    }
}

$pattern = '^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.(?<ext>md|canvas|base)$'
$files = Get-ChildItem -LiteralPath $resolvedRoot -File -Recurse | Where-Object { $extensions -contains $_.Extension }
$errors = New-Object "System.Collections.Generic.List[string]"

function Get-FrontmatterValue {
    param(
        [string[]]$FrontmatterLines,
        [string]$Key
    )

    $escapedKey = [regex]::Escape($Key)
    foreach ($line in $FrontmatterLines) {
        if ($line -match "^${escapedKey}:\s*[""']?(?<value>[^""'#]+)[""']?\s*$") {
            return $matches["value"].Trim()
        }
    }

    return $null
}

foreach ($file in $files) {
    if ($file.Name -notmatch $pattern) {
        $errors.Add("Invalid filename format: $($file.FullName)")
        continue
    }

    $workItemSlug = $matches["work_item_slug"]
    $stepId = $matches["step_id"]
    $stepSlug = $matches["step_slug"]
    $extension = $matches["ext"]
    $allowedKey = "$stepId.$stepSlug.$extension"

    if (-not $allowedKeys.Contains($allowedKey)) {
        $errors.Add("Unsupported step/slug/extension combination: $($file.FullName)")
        continue
    }

    if ($extension -ne "md") {
        continue
    }

    $lines = Get-Content -LiteralPath $file.FullName -TotalCount 80
    if ($lines.Count -lt 3 -or $lines[0].Trim() -ne "---") {
        $errors.Add("Missing YAML frontmatter: $($file.FullName)")
        continue
    }

    $closingIndex = -1
    for ($index = 1; $index -lt $lines.Count; $index++) {
        if ($lines[$index].Trim() -eq "---") {
            $closingIndex = $index
            break
        }
    }

    if ($closingIndex -lt 1) {
        $errors.Add("Unclosed YAML frontmatter: $($file.FullName)")
        continue
    }

    $frontmatterLines = $lines[1..($closingIndex - 1)]
    $expectedValues = @{
        "artifact_id" = "$workItemSlug.$stepId.$stepSlug"
        "work_item_slug" = $workItemSlug
        "step_id" = $stepId
        "step_slug" = $stepSlug
    }

    foreach ($key in $expectedValues.Keys) {
        $actualValue = Get-FrontmatterValue -FrontmatterLines $frontmatterLines -Key $key
        if ([string]::IsNullOrWhiteSpace($actualValue)) {
            $errors.Add("Missing frontmatter key '$key': $($file.FullName)")
            continue
        }

        if ($actualValue -ne $expectedValues[$key]) {
            $errors.Add("Frontmatter mismatch for '$key' in $($file.FullName). Expected '$($expectedValues[$key])' but found '$actualValue'.")
        }
    }
}

if ($errors.Count -gt 0) {
    foreach ($errorLine in $errors) {
        Write-Host "ERROR: $errorLine"
    }

    exit 1
}

Write-Host "OK: validated $($files.Count) workflow artifact files under $resolvedRoot"
