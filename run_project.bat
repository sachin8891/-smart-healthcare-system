@echo off
title Smart Healthcare Appointment & Prescription System
echo =====================================================================
echo   Starting Smart Healthcare Appointment & Prescription System
echo   Tech Stack: Python, Pandas, NumPy, SQL, MySQL, Java, Spring Boot
echo   Developed by: Sachin Gurjar
echo =====================================================================

set "PATH=C:\Users\HP\.tools\node;C:\Users\HP\.tools\jdk\bin;%PATH%"

echo.
echo [1/3] Initializing Healthcare Relational Database...
python "%~dp0database\db_setup.py"

echo [2/3] Booting Java Spring Boot Backend (Port 8081) & Python Engine (Port 5001)...
start "" "C:\Users\HP\.tools\jdk\bin\java.exe" -cp "%~dp0backend-spring-boot\bin" com.healthcare.SmartHealthcareApplication
start "" python "%~dp0analytics-python\app.py"

echo [3/3] Launching React Operations Dashboard on http://localhost:3001 ...
cd /d "%~dp0frontend-react"
call "C:\Users\HP\.tools\node\npm.cmd" run dev
