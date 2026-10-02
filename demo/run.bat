@echo off
setlocal
cd /d "%~dp0"
start "KMS AMIS serveris" /b cmd /c "python -m http.server 8000"
timeout /t 1 /nobreak >nul
start "KMS AMIS demonstracija" http://localhost:8000/
