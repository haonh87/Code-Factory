param(
  [string]$GitHubUsername,
  [string]$GitHubToken,
  [ValidateSet("User", "Process")]
  [string]$Scope = "User",
  [switch]$Clear,
  [switch]$ShowStatus
)

$ErrorActionPreference = "Stop"

function Get-StoredEnvironmentValue {
  param(
    [string]$Name,
    [ValidateSet("User", "Process")]
    [string]$TargetScope
  )

  return [Environment]::GetEnvironmentVariable($Name, $TargetScope)
}

function Set-ProcessEnvironmentValue {
  param(
    [string]$Name,
    [AllowNull()]
    [string]$Value
  )

  if ([string]::IsNullOrEmpty($Value)) {
    Remove-Item -Path "Env:$Name" -ErrorAction SilentlyContinue
    return
  }

  Set-Item -Path "Env:$Name" -Value $Value
}

function Convert-SecureStringToPlainText {
  param(
    [Security.SecureString]$SecureValue
  )

  if ($null -eq $SecureValue) {
    return $null
  }

  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  }
  finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

function Show-Status {
  $processUserName = -not [string]::IsNullOrWhiteSpace((Get-StoredEnvironmentValue -Name "GITHUB_USERNAME" -TargetScope "Process"))
  $processToken = -not [string]::IsNullOrWhiteSpace((Get-StoredEnvironmentValue -Name "GITHUB_TOKEN" -TargetScope "Process"))
  $userUserName = -not [string]::IsNullOrWhiteSpace((Get-StoredEnvironmentValue -Name "GITHUB_USERNAME" -TargetScope "User"))
  $userToken = -not [string]::IsNullOrWhiteSpace((Get-StoredEnvironmentValue -Name "GITHUB_TOKEN" -TargetScope "User"))

  Write-Host ("PROCESS_GITHUB_USERNAME_PRESENT={0}" -f $processUserName)
  Write-Host ("PROCESS_GITHUB_TOKEN_PRESENT={0}" -f $processToken)
  Write-Host ("USER_GITHUB_USERNAME_PRESENT={0}" -f $userUserName)
  Write-Host ("USER_GITHUB_TOKEN_PRESENT={0}" -f $userToken)
}

if ($ShowStatus) {
  Show-Status
  exit 0
}

if ($Clear) {
  if ($Scope -eq "User") {
    [Environment]::SetEnvironmentVariable("GITHUB_USERNAME", $null, "User")
    [Environment]::SetEnvironmentVariable("GITHUB_TOKEN", $null, "User")
  }

  Set-ProcessEnvironmentValue -Name "GITHUB_USERNAME" -Value $null
  Set-ProcessEnvironmentValue -Name "GITHUB_TOKEN" -Value $null

  Write-Host ("Cleared GitHub Push credentials from scope: {0}" -f $Scope)
  if ($Scope -eq "User") {
    Write-Host "Restart Codex or open a new terminal session to verify the persisted removal."
  }
  exit 0
}

if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
  $existingUsername = Get-StoredEnvironmentValue -Name "GITHUB_USERNAME" -TargetScope $Scope
  if (-not [string]::IsNullOrWhiteSpace($existingUsername)) {
    $GitHubUsername = $existingUsername
  }
}

if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
  $GitHubUsername = Read-Host "GitHub username"
}

if ([string]::IsNullOrWhiteSpace($GitHubToken)) {
  $secureToken = Read-Host "GitHub token" -AsSecureString
  $GitHubToken = Convert-SecureStringToPlainText -SecureValue $secureToken
}

if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
  throw "GitHub username must not be empty."
}

if ([string]::IsNullOrWhiteSpace($GitHubToken)) {
  throw "GitHub token must not be empty."
}

if ($Scope -eq "User") {
  [Environment]::SetEnvironmentVariable("GITHUB_USERNAME", $GitHubUsername, "User")
  [Environment]::SetEnvironmentVariable("GITHUB_TOKEN", $GitHubToken, "User")
}

Set-ProcessEnvironmentValue -Name "GITHUB_USERNAME" -Value $GitHubUsername
Set-ProcessEnvironmentValue -Name "GITHUB_TOKEN" -Value $GitHubToken

Write-Host ("Configured GitHub Push credentials for scope: {0}" -f $Scope)
Write-Host "Current PowerShell session has been updated."
if ($Scope -eq "User") {
  Write-Host "New terminal or Codex sessions will inherit these variables."
}
Write-Host "No secret was written into repo files or ~/.codex/config.toml."
