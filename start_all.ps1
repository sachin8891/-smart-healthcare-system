# ============================================================================
# Smart Healthcare Appointment & Prescription System - Single Command Launcher
# Tech Stack: Python, Pandas, NumPy, SQL, MySQL, Java, Spring Boot
# Developed by: Sachin Gurjar
# ============================================================================

$root = $PSScriptRoot
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "  Starting Smart Healthcare Appointment & Prescription System        " -ForegroundColor Cyan
Write-Host "  Tech Stack: Python, Pandas, NumPy, SQL, MySQL, Java, Spring Boot   " -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan

# 1. Ensure PATH has Node.js and OpenJDK
$env:PATH = "C:\Users\HP\.tools\node;C:\Users\HP\.tools\jdk\bin;$env:PATH"

# 2. Initialize / Verify Relational Database
Write-Host "`n[1/4] Verifying Healthcare Database & Seed Data..." -ForegroundColor Yellow
python "$root\database\db_setup.py"

# 3. Start Java Spring Boot Backend Service (Port 8081)
Write-Host "[2/4] Starting Java Spring Boot Backend Service on port 8081..." -ForegroundColor Yellow
$javaBin = "$root\backend-spring-boot\bin"
Start-Process -FilePath "C:\Users\HP\.tools\jdk\bin\java.exe" -ArgumentList "-cp `"$javaBin`" com.healthcare.SmartHealthcareApplication" -WindowStyle Hidden

# 4. Start Python Analytics & Automated Reminders REST API (Port 5001)
Write-Host "[3/4] Starting Python, Pandas & NumPy Analytics API on port 5001..." -ForegroundColor Yellow
Start-Process -FilePath "python" -ArgumentList "`"$root\analytics-python\app.py`"" -WindowStyle Hidden

# 5. Start React.js Dashboard (Port 3001)
Write-Host "[4/4] Starting React.js Frontend on http://localhost:3001..." -ForegroundColor Green
Write-Host "`nAll healthcare microservices active!" -ForegroundColor Cyan
Write-Host "  - React Web Dashboard:     http://localhost:3001" -ForegroundColor White
Write-Host "  - Python Analytics API:    http://localhost:5001/api/health" -ForegroundColor White
Write-Host "  - Java Spring Boot API:    http://localhost:8081/api/health" -ForegroundColor White

Set-Location "$root\frontend-react"
& "C:\Users\HP\.tools\node\npm.cmd" run dev
