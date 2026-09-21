# Smart Healthcare Appointment & Prescription System

**Developer:** Sachin Gurjar  
**Portfolio Project:** Resume Featured Project #2  
**Tech Stack:** Python, Pandas, NumPy, SQL, MySQL, Java, Spring Boot  

---

## 🎯 Project Overview & Resume Alignment

An enterprise healthcare operations, scheduling intelligence, and patient follow-up platform designed for hospitals, clinics, and outpatient departments. The system tracks appointments across clinical specialties, diagnoses scheduling bottlenecks, computes patient wait-time percentiles, and delivers automated multi-channel medication alerts (SMS/Email).

### Resume Feature Verification

| Resume Bullet Point | Architecture Implementation | Key Files |
|---|---|---|
| **1. Relational MySQL Database & SQL Queries** | Normalized relational schema covering `patients`, `doctors`, `appointments`, `prescriptions`, `prescription_medicines`, and `medicine_reminders`. Production SQL queries for schedule utilization and wait-time bottlenecks. | `database/schema.sql`<br/>`database/seed_data.sql`<br/>`database/analytics_queries.sql` |
| **2. Python, Pandas & NumPy Analytics** | Data cleaning pipeline parsing clinical time blocks, calculating wait-time percentiles (p50, p90, p95), hourly rush densities, and no-show correlations. | `analytics-python/appointment_analytics.py` |
| **3. Data-Driven Process Improvement Insights** | Automated operational diagnostics engine identifying departmental bottlenecks, recommending dynamic slot padding, and calculating revenue recovery. | `analytics-python/insights_engine.py` |
| **4. Automated Medicine Reminders (SMS/Email)** | Multi-channel notification dispatcher simulating automated dosage schedule alerts and follow-up consultation reminders. | `analytics-python/reminder_service.py` |
| **5. Java & Spring Boot REST API** | High-performance Java REST microservice handling patient records, appointments, and prescription models on port 8081. | `backend-spring-boot/src/main/java/` |

---

## 🏗️ System Architecture

```
                                  +---------------------------------------+
                                  |     React.js Healthcare Dashboard     |
                                  |     - Patient & Appointment Manager   |
                                  |     - Scheduling Trends & Heatmaps    |
                                  |     - Medicine Reminder Console       |
                                  |     - SQL Analytical Query Runner     |
                                  |              (Port 3001)              |
                                  +-------------------+-------------------+
                                                      |
                                     HTTP Requests (Ports 8081 & 5001)
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
        +---------------------------------+                       +---------------------------------+
        |   Python, Pandas & NumPy Engine |                       |    Java 21 Spring Boot Backend  |
        |  - Appointment Trend Analysis   |                       |    (REST API & Data Services)   |
        |  - Wait-time Distribution & EDA |                       |  - Patient Management Service   |
        |  - Operational Insights Engine  |                       |  - Appointment Booking API      |
        |  - Automated SMS/Email Engine   |                       |  - Prescription Record Engine   |
        |  - Flask Analytics API (5001)   |                       |  - Spring Boot (Port 8081)      |
        +----------------+----------------+                       +----------------+----------------+
                         |                                                         |
                         +----------------------------+----------------------------+
                                                      |
                                                      v
                                    +-----------------------------------+
                                    |     Relational Healthcare DB      |
                                    |   (MySQL 8.0 & SQLite Schema)     |
                                    |  - patients, doctors, appointments|
                                    |  - prescriptions, reminders       |
                                    +-----------------------------------+
```

---

## 🚀 Quick Start Guide

### Option 1: One-Click Startup (Recommended)
Double-click `run_project.bat` or execute in PowerShell:
```powershell
.\start_all.ps1
```

### Option 2: Individual Service Execution

#### 1. Initialize Relational Database
```bash
python database/db_setup.py
```

#### 2. Run Python Analytics & Reminder API (Port 5001)
```bash
python analytics-python/app.py
```

#### 3. Run Java Spring Boot Service (Port 8081)
```bash
java -cp backend-spring-boot/bin com.healthcare.SmartHealthcareApplication
```

#### 4. Run React Healthcare Dashboard (Port 3001)
```bash
cd frontend-react
npm run dev
```
Visit **`http://localhost:3001`** in your browser.

---

## 💼 Interview Talking Points

1. **Relational Database Design:** Explain how you separated `appointments` from `prescriptions` and created a normalized `prescription_medicines` table allowing multiple drug schedules per clinical encounter.
2. **NumPy Statistical Metrics:** Discuss how you computed non-parametric percentiles (p50 median vs p90 tail delays) instead of just simple averages to identify true queue bottlenecks in outpatient departments.
3. **Operational Improvements:** Explain the root-cause finding where Cardiology had 25-minute average consultations despite 15-minute slot budgets, and how dynamic slot padding resolves waiting room congestion.
4. **Automated Reminders:** Discuss the multi-channel notification architecture that matches dosage timings (morning/evening) and tracks delivery statuses (`Delivered`, `Pending`).
