param(
    [Parameter(Mandatory = $true)]
    [string]$WorkflowRoot
)

$ErrorActionPreference = "Stop"
$scriptPath = Join-Path $PSScriptRoot "validate-workflow-artifact-names.js"

& node $scriptPath --workflow-root $WorkflowRoot
exit $LASTEXITCODE
