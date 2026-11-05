
@echo off
setlocal EnableExtensions
title Local Website Launcher

rem ==========================================
rem CONFIGURATION
rem ==========================================

set "OWNER=tojefin"
set "REPO=kinofree"
set "BRANCH=gh-pages"

set "PYTHON_VERSION=3.13.17"
set "PORT=8080"

set "PYTHON_DIR=%~dp0python"
set "SITE_DIR=%~dp0site"
set "TEMP_DIR=%~dp0temp"
set "VERSION_FILE=%~dp0version.txt"

set "PYTHON_ZIP=%~dp0python.zip"
set "SITE_ZIP=%~dp0site.zip"

set "API_URL=https://api.github.com/repos/%OWNER%/%REPO%/tags"
set "SITE_URL=https://github.com/%OWNER%/%REPO%/archive/refs/heads/%BRANCH%.zip"

cd /d "%~dp0"

echo.
echo ==========================================
echo         LOCAL WEBSITE LAUNCHER
echo ==========================================
echo.

rem ==========================================
rem DETECT ARCHITECTURE
rem ==========================================

set "ARCH=%PROCESSOR_ARCHITECTURE%"

if defined PROCESSOR_ARCHITEW6432 (
    set "ARCH=%PROCESSOR_ARCHITEW6432%"
)

if /I "%ARCH%"=="AMD64" set "PYTHON_ARCH=amd64"
if /I "%ARCH%"=="x86" set "PYTHON_ARCH=win32"
if /I "%ARCH%"=="ARM64" set "PYTHON_ARCH=arm64"

if not defined PYTHON_ARCH (
    echo ERROR: Unsupported architecture: %ARCH%
    goto error
)

rem ==========================================
rem DOWNLOAD PYTHON
rem ==========================================

if exist "%PYTHON_DIR%\python.exe" goto python_ready

echo Downloading portable Python...

set "PYTHON_URL=https://www.python.org/ftp/python/%PYTHON_VERSION%/python-%PYTHON_VERSION%-embed-%PYTHON_ARCH%.zip"

powershell -NoProfile -Command ^
 "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -UseBasicParsing '%PYTHON_URL%' -OutFile '%PYTHON_ZIP%'"

if errorlevel 1 goto error

powershell -NoProfile -Command ^
 "Expand-Archive -LiteralPath '%PYTHON_ZIP%' -DestinationPath '%PYTHON_DIR%' -Force"

if errorlevel 1 goto error

del "%PYTHON_ZIP%"

:python_ready


rem ==========================================
rem CREATE SERVER SCRIPT
rem ==========================================

if exist "%~dp0server.py" goto server_ready

echo Creating server.py...

@echo off
(
echo import os
echo from http.server import HTTPServer, SimpleHTTPRequestHandler
echo.
echo ROOT = os.path.join^(os.path.dirname^(__file__^), "site"^)
echo HOST = "0.0.0.0"
echo PORT = 8080
echo.
echo class Handler^(SimpleHTTPRequestHandler^):
echo     def __init__^(self, *args, **kwargs^):
echo         super^(^).__init__^(*args, directory=ROOT, **kwargs^)
echo.
echo     def translate_path^(self, path^):
echo         path = super^(^).translate_path^(path^)
echo.
echo         if os.path.isfile^(path^) or os.path.isdir^(path^):
echo             return path
echo.
echo         if not os.path.splitext^(path^)[1]:
echo             html_path = path + ".html"
echo             if os.path.isfile^(html_path^):
echo                 return html_path
echo.
echo         return path
echo.
echo     def log_message^(self, format, *args^):
echo         pass
echo.
echo if __name__ == "__main__":
echo     try:
echo         HTTPServer^((HOST, PORT^), Handler^).serve_forever^(^)
echo     except KeyboardInterrupt:
echo         print^('Server stopped', flush=True^)
) > server.py

echo server.py created successfully!
if errorlevel 1 goto error

:server_ready


rem ==========================================
rem CHECK LATEST GITHUB TAG
rem ==========================================

echo.
echo Checking latest version...

set "LATEST_TAG="

for /f "usebackq delims=" %%A in (`powershell -NoProfile -Command ^
 "$ProgressPreference='SilentlyContinue'; try { $tags=Invoke-RestMethod -Uri '%API_URL%' -Headers @{'User-Agent'='LocalWebsiteLauncher'}; if ($tags.Count -gt 0) { $tags[0].name } } catch { exit 1 }"`) do (
    set "LATEST_TAG=%%A"
)

if not defined LATEST_TAG (
    echo ERROR: Could not retrieve GitHub tag.
    goto error
)

set "CURRENT_TAG="

if exist "%VERSION_FILE%" (
    set /p CURRENT_TAG=<"%VERSION_FILE%"
)

echo Local version: %CURRENT_TAG%
echo Latest version: %LATEST_TAG%

if /I "%CURRENT_TAG%"=="%LATEST_TAG%" (
    if exist "%SITE_DIR%\index.html" (
        echo.
        echo Website is up to date.
        goto site_ready
    )
)

rem ==========================================
rem DOWNLOAD LATEST GH-PAGES BUILD
rem ==========================================

echo.
echo Updating website from gh-pages...

if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

powershell -NoProfile -Command ^
 "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -UseBasicParsing '%SITE_URL%' -OutFile '%SITE_ZIP%'"

if errorlevel 1 goto error

powershell -NoProfile -Command ^
 "Expand-Archive -LiteralPath '%SITE_ZIP%' -DestinationPath '%TEMP_DIR%' -Force; $root=Get-ChildItem -LiteralPath '%TEMP_DIR%' -Directory | Select-Object -First 1; if (!$root) { throw 'Archive is empty' }; if (!(Test-Path (Join-Path $root.FullName 'index.html'))) { throw 'index.html not found' }; if (Test-Path '%SITE_DIR%') { Remove-Item '%SITE_DIR%' -Recurse -Force }; New-Item -ItemType Directory -Path '%SITE_DIR%' -Force | Out-Null; Get-ChildItem -LiteralPath $root.FullName -Force | Copy-Item -Destination '%SITE_DIR%' -Recurse -Force"

if errorlevel 1 goto error

echo %LATEST_TAG%>"%VERSION_FILE%"

del "%SITE_ZIP%"
rmdir /s /q "%TEMP_DIR%"

echo Website updated to %LATEST_TAG%.

:site_ready


rem ==========================================
rem START SERVER
rem ==========================================

echo.
echo ==========================================
echo Website: http://localhost:%PORT%
echo Version: %LATEST_TAG%
echo Press CTRL+C to stop the server.
echo ==========================================
echo.

start "" "http://localhost:%PORT%"

"%PYTHON_DIR%\python.exe" -u server.py %PORT%

echo.
echo Server stopped.
pause

goto end

:error
echo.
echo ==========================================
echo ERROR OCCURRED!
echo Existing website files have been preserved
echo unless an error occurred during replacement.
echo ==========================================
pause
exit /b 1

:end
endlocal
