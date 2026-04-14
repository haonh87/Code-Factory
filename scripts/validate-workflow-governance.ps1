param(
    [Parameter(Mandatory = $true)]
    [string]$WorkflowRoot,

    [Parameter(Mandatory = $false)]
    [string]$ProjectRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"
$scriptPath = Join-Path $PSScriptRoot "validate-workflow-governance.js"

& node $scriptPath --workflow-root $WorkflowRoot --project-root $ProjectRoot
exit $LASTEXITCODE
