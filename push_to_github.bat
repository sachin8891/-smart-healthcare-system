@echo off
title Push Smart Healthcare System to GitHub
cd /d "%~dp0"
echo ============================================================
echo   Pushing Smart Healthcare System to GitHub
echo ============================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/sachin8891/Smart-Healthcare-System.git): "
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code successfully pushed to GitHub!
) else (
    echo [ERROR] Push failed. If prompted, please sign in with your GitHub account.
)
pause
