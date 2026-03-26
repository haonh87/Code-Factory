@echo off
setlocal

set "SCRIPT_DIR=%~dp0"

powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%install-codex-workflow.ps1" -CreateDriveRootLinks %*
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
  echo.
  echo Global Codex workflow install failed with exit code %EXIT_CODE%.
  exit /b %EXIT_CODE%
)

echo.
echo Global Codex workflow install completed.
echo Restart Codex sessions to load updated global policy and skills.

endlocal
