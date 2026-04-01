@echo off
setlocal

set "SCRIPT_DIR=%~dp0"

powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%configure-github-push-credentials.ps1" %*
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
  echo.
  echo GitHub Push credential setup failed with exit code %EXIT_CODE%.
  exit /b %EXIT_CODE%
)

echo.
echo GitHub Push credential setup completed.

endlocal
