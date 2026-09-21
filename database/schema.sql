-- ============================================================================
-- Smart Healthcare Appointment & Prescription System
-- Relational Database Schema (MySQL 8.0 & Relational Standard SQL)
-- Developed by: Sachin Gurjar
-- ============================================================================

CREATE DATABASE IF NOT EXISTS smart_healthcare_db;
USE smart_healthcare_db;

-- 1. Patients Table
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_code VARCHAR(30) UNIQUE NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    blood_group VARCHAR(10),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_code VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    experience_years INT NOT NULL DEFAULT 5,
    room_number VARCHAR(20) NOT NULL,
    consultation_fee DECIMAL(10, 2) NOT NULL DEFAULT 500.00,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_code VARCHAR(35) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL, -- e.g. '09:30 AM', '10:00 AM'
    status VARCHAR(30) NOT NULL DEFAULT 'Scheduled', -- 'Completed', 'Scheduled', 'Cancelled', 'No-Show'
    symptoms TEXT,
    wait_time_minutes INT DEFAULT 0, -- Time patient waited before consultation
    consultation_duration INT DEFAULT 15, -- Actual consultation length in minutes
    booking_lead_days INT DEFAULT 3, -- Days between booking date and appointment date
    booking_channel VARCHAR(30) DEFAULT 'Online Portal', -- 'Online Portal', 'Phone Call', 'Walk-in'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- 4. Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
    prescription_id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_code VARCHAR(35) UNIQUE NOT NULL,
    appointment_id INT UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    diagnosis VARCHAR(255) NOT NULL,
    clinical_notes TEXT,
    follow_up_date DATE,
    prescribed_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- 5. Prescription Medicines Table (Specific items within each prescription)
CREATE TABLE IF NOT EXISTS prescription_medicines (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    medicine_name VARCHAR(150) NOT NULL,
    dosage VARCHAR(60) NOT NULL, -- e.g. '500mg', '10ml', '1 Tablet'
    frequency VARCHAR(100) NOT NULL, -- e.g. 'Twice daily after food'
    duration_days INT NOT NULL DEFAULT 7,
    time_of_day VARCHAR(60) NOT NULL, -- 'Morning, Night', 'Morning, Afternoon, Night'
    instructions TEXT,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id) ON DELETE CASCADE
);

-- 6. Medicine Reminders Table (Automated SMS / Email Notifications)
CREATE TABLE IF NOT EXISTS medicine_reminders (
    reminder_id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    patient_id INT NOT NULL,
    channel VARCHAR(20) NOT NULL DEFAULT 'SMS', -- 'SMS', 'Email'
    reminder_type VARCHAR(40) NOT NULL DEFAULT 'Dosage Alert', -- 'Dosage Alert', 'Refill Alert', 'Follow-up'
    scheduled_time VARCHAR(20) NOT NULL, -- e.g. '08:00 AM', '08:00 PM'
    message_content TEXT NOT NULL,
    delivery_status VARCHAR(30) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Delivered', 'Failed'
    sent_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

-- Indices for rapid query optimization
CREATE INDEX idx_appt_date_status ON appointments (appointment_date, status);
CREATE INDEX idx_appt_doctor ON appointments (doctor_id);
CREATE INDEX idx_appt_patient ON appointments (patient_id);
CREATE INDEX idx_presc_patient ON prescriptions (patient_id);
CREATE INDEX idx_reminder_status ON medicine_reminders (delivery_status);
