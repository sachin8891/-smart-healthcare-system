-- ============================================================================
-- Smart Healthcare Appointment & Prescription System
-- Production Analytical SQL Query Suite
-- Purpose: Advanced SQL for appointment trend detection, no-show rate modeling,
-- doctor workload bottlenecks, and prescription frequency reporting.
-- Developed by: Sachin Gurjar
-- ============================================================================

USE smart_healthcare_db;

-- ----------------------------------------------------------------------------
-- QUERY 1: Doctor Schedule Utilization & Appointment Fulfillment Rate
-- Calculates total slots, completed vs no-show/cancelled, and fulfillment %
-- ----------------------------------------------------------------------------
SELECT 
    d.doctor_id,
    d.name AS doctor_name,
    d.department,
    d.specialization,
    COUNT(a.appointment_id) AS total_scheduled_slots,
    SUM(CASE WHEN a.status = 'Completed' THEN 1 ELSE 0 END) AS completed_appointments,
    SUM(CASE WHEN a.status = 'No-Show' THEN 1 ELSE 0 END) AS no_show_count,
    SUM(CASE WHEN a.status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
    ROUND((SUM(CASE WHEN a.status = 'Completed' THEN 1 ELSE 0 END) * 100.0) / COUNT(a.appointment_id), 2) AS fulfillment_rate_percent,
    ROUND((SUM(CASE WHEN a.status = 'No-Show' THEN 1 ELSE 0 END) * 100.0) / COUNT(a.appointment_id), 2) AS no_show_rate_percent
FROM doctors d
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id, d.name, d.department, d.specialization
ORDER BY total_scheduled_slots DESC;

-- ----------------------------------------------------------------------------
-- QUERY 2: Patient Wait-Time Bottleneck Analysis using Window Functions
-- Measures individual wait time against doctor's average and department average
-- ----------------------------------------------------------------------------
SELECT 
    a.appointment_id,
    a.appointment_code,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    d.name AS doctor_name,
    d.department,
    a.time_slot,
    a.wait_time_minutes,
    ROUND(AVG(a.wait_time_minutes) OVER(PARTITION BY a.doctor_id), 1) AS doctor_avg_wait_minutes,
    ROUND(AVG(a.wait_time_minutes) OVER(PARTITION BY d.department), 1) AS dept_avg_wait_minutes,
    (a.wait_time_minutes - ROUND(AVG(a.wait_time_minutes) OVER(PARTITION BY a.doctor_id), 1)) AS wait_time_deviation,
    CASE 
        WHEN a.wait_time_minutes > 30 THEN 'Severe Bottleneck'
        WHEN a.wait_time_minutes > 15 THEN 'Moderate Delay'
        ELSE 'On Schedule'
    END AS operational_flag
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
WHERE a.status = 'Completed'
ORDER BY a.wait_time_minutes DESC;

-- ----------------------------------------------------------------------------
-- QUERY 3: No-Show & Cancellation Correlation by Booking Lead Days
-- Analyzes whether patients booking far in advance have higher no-show probability
-- ----------------------------------------------------------------------------
SELECT 
    CASE 
        WHEN booking_lead_days <= 1 THEN 'Same/Next Day (0-1 days)'
        WHEN booking_lead_days BETWEEN 2 AND 4 THEN 'Short Lead (2-4 days)'
        WHEN booking_lead_days BETWEEN 5 AND 7 THEN 'Medium Lead (5-7 days)'
        ELSE 'Long Lead (>7 days)'
    END AS lead_time_bucket,
    COUNT(appointment_id) AS total_bookings,
    SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_count,
    SUM(CASE WHEN status = 'No-Show' THEN 1 ELSE 0 END) AS no_show_count,
    SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
    ROUND((SUM(CASE WHEN status = 'No-Show' THEN 1 ELSE 0 END) * 100.0) / COUNT(appointment_id), 2) AS no_show_probability_pct
FROM appointments
GROUP BY 
    CASE 
        WHEN booking_lead_days <= 1 THEN 'Same/Next Day (0-1 days)'
        WHEN booking_lead_days BETWEEN 2 AND 4 THEN 'Short Lead (2-4 days)'
        WHEN booking_lead_days BETWEEN 5 AND 7 THEN 'Medium Lead (5-7 days)'
        ELSE 'Long Lead (>7 days)'
    END
ORDER BY total_bookings DESC;

-- ----------------------------------------------------------------------------
-- QUERY 4: Most Frequently Prescribed Medications & Therapeutic Categories
-- Aggregates prescription counts and patient reach across all clinical visits
-- ----------------------------------------------------------------------------
SELECT 
    pm.medicine_name,
    COUNT(pm.item_id) AS total_prescriptions,
    COUNT(DISTINCT pr.patient_id) AS distinct_patients_treated,
    ROUND(AVG(pm.duration_days), 1) AS avg_treatment_duration_days,
    GROUP_CONCAT(DISTINCT d.department ORDER BY d.department SEPARATOR ', ') AS prescribing_departments
FROM prescription_medicines pm
JOIN prescriptions pr ON pm.prescription_id = pr.prescription_id
JOIN doctors d ON pr.doctor_id = d.doctor_id
GROUP BY pm.medicine_name
ORDER BY total_prescriptions DESC, distinct_patients_treated DESC;

-- ----------------------------------------------------------------------------
-- QUERY 5: Automated Medication Reminder Delivery Rate & Channel Performance
-- Tracks SMS vs Email effectiveness and identifies pending follow-up triggers
-- ----------------------------------------------------------------------------
SELECT 
    mr.channel,
    mr.reminder_type,
    COUNT(mr.reminder_id) AS total_notifications_scheduled,
    SUM(CASE WHEN mr.delivery_status = 'Delivered' THEN 1 ELSE 0 END) AS successfully_delivered,
    SUM(CASE WHEN mr.delivery_status = 'Pending' THEN 1 ELSE 0 END) AS pending_dispatch,
    ROUND((SUM(CASE WHEN mr.delivery_status = 'Delivered' THEN 1 ELSE 0 END) * 100.0) / COUNT(mr.reminder_id), 2) AS delivery_success_rate
FROM medicine_reminders mr
GROUP BY mr.channel, mr.reminder_type
ORDER BY total_notifications_scheduled DESC;
