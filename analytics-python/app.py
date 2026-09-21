"""
Flask REST API for Smart Healthcare Appointment & Prescription System
Serves analytical endpoints, trend models, operational insights,
automated medicine reminders, and SQL query playground results.
Developed by: Sachin Gurjar
Port: 5001
"""

import os
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
from appointment_analytics import AppointmentAnalytics
from insights_engine import OperationalInsightsEngine
from reminder_service import MedicineReminderService

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

analytics = AppointmentAnalytics()
insights_engine = OperationalInsightsEngine(analytics)
reminder_service = MedicineReminderService()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'Smart Healthcare Analytics & Automated Reminder API',
        'port': 5001,
        'version': '1.0.0',
        'developer': 'Sachin Gurjar'
    })

@app.route('/api/analytics/kpis', methods=['GET'])
def get_kpis():
    try:
        data = analytics.compute_summary_kpis()
        reminder_stats = reminder_service.get_reminder_statistics()
        data['reminder_stats'] = reminder_stats
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/trends', methods=['GET'])
def get_trends():
    try:
        hourly = analytics.analyze_hourly_rush()
        day_of_week = analytics.analyze_day_of_week_trends()
        dept_workload = analytics.analyze_department_workload()
        lead_time = analytics.analyze_lead_time_correlation()

        return jsonify({
            'hourly_rush': hourly,
            'day_of_week_trends': day_of_week,
            'department_workload': dept_workload,
            'lead_time_correlation': lead_time
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/insights', methods=['GET'])
def get_insights():
    try:
        data = insights_engine.generate_all_insights()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reminders/list', methods=['GET'])
def get_reminders():
    try:
        status = request.args.get('status')
        reminders = reminder_service.get_all_reminders(status_filter=status)
        return jsonify(reminders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reminders/dispatch', methods=['POST'])
def dispatch_reminders():
    try:
        result = reminder_service.dispatch_pending_reminders()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reminders/create', methods=['POST'])
def create_reminder():
    try:
        data = request.json or {}
        presc_id = data.get('prescription_id', 1)
        pat_id = data.get('patient_id', 1)
        channel = data.get('channel', 'SMS')
        rem_type = data.get('reminder_type', 'Dosage Alert')
        sched_time = data.get('scheduled_time', '09:00 AM')
        msg = data.get('message', 'Default reminder message')

        res = reminder_service.create_custom_reminder(presc_id, pat_id, channel, rem_type, sched_time, msg)
        return jsonify(res)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/appointments/list', methods=['GET'])
def get_appointments():
    try:
        conn = analytics._get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
        SELECT 
            a.appointment_id,
            a.appointment_code,
            a.patient_id,
            p.first_name || ' ' || p.last_name AS patient_name,
            p.phone AS patient_phone,
            a.doctor_id,
            d.name AS doctor_name,
            d.department,
            a.appointment_date,
            a.time_slot,
            a.status,
            a.symptoms,
            a.wait_time_minutes,
            a.consultation_duration,
            a.booking_channel
        FROM appointments a
        JOIN patients p ON a.patient_id = p.patient_id
        JOIN doctors d ON a.doctor_id = d.doctor_id
        ORDER BY a.appointment_date DESC, a.time_slot ASC;
        """)
        rows = [dict(r) for r in cursor.fetchall()]
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/prescriptions/list', methods=['GET'])
def get_prescriptions():
    try:
        conn = analytics._get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
        SELECT 
            pr.prescription_id,
            pr.prescription_code,
            pr.appointment_id,
            pr.patient_id,
            p.first_name || ' ' || p.last_name AS patient_name,
            p.email AS patient_email,
            p.blood_group,
            d.name AS doctor_name,
            d.department,
            pr.diagnosis,
            pr.clinical_notes,
            pr.follow_up_date,
            pr.prescribed_date
        FROM prescriptions pr
        JOIN patients p ON pr.patient_id = p.patient_id
        JOIN doctors d ON pr.doctor_id = d.doctor_id
        ORDER BY pr.prescribed_date DESC;
        """)
        prescriptions = [dict(r) for r in cursor.fetchall()]

        # Attach medicines to each prescription
        for p in prescriptions:
            cursor.execute("""
            SELECT item_id, medicine_name, dosage, frequency, duration_days, time_of_day, instructions
            FROM prescription_medicines
            WHERE prescription_id = ?;
            """, (p['prescription_id'],))
            p['medicines'] = [dict(m) for m in cursor.fetchall()]

        conn.close()
        return jsonify(prescriptions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/patients/list', methods=['GET'])
def get_patients():
    try:
        conn = analytics._get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM patients ORDER BY patient_id ASC;")
        rows = [dict(r) for r in cursor.fetchall()]
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/doctors/list', methods=['GET'])
def get_doctors():
    try:
        conn = analytics._get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM doctors ORDER BY doctor_id ASC;")
        rows = [dict(r) for r in cursor.fetchall()]
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/sql-queries', methods=['GET'])
def get_sql_queries_and_results():
    """Returns the production analytical SQL queries and executes them live against SQLite."""
    conn = analytics._get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    queries = [
        {
            "id": 1,
            "title": "Doctor Schedule Utilization & Appointment Fulfillment Rate",
            "description": "Calculates total capacity slots, completed consultations, no-show counts, and fulfillment percentages by doctor and department.",
            "sql": """
SELECT 
    d.doctor_id,
    d.name AS doctor_name,
    d.department,
    d.specialization,
    COUNT(a.appointment_id) AS total_slots,
    SUM(CASE WHEN a.status = 'Completed' THEN 1 ELSE 0 END) AS completed_count,
    SUM(CASE WHEN a.status = 'No-Show' THEN 1 ELSE 0 END) AS no_show_count,
    ROUND((SUM(CASE WHEN a.status = 'Completed' THEN 1 ELSE 0 END) * 100.0) / COUNT(a.appointment_id), 1) AS fulfillment_rate_pct
FROM doctors d
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id
ORDER BY total_slots DESC;
"""
        },
        {
            "id": 2,
            "title": "Patient Wait-Time Bottleneck Analysis using Window Functions",
            "description": "Measures individual wait times against the doctor's average wait time to flag severe bottlenecks (>30 mins) and operational delays.",
            "sql": """
SELECT 
    a.appointment_code,
    (p.first_name || ' ' || p.last_name) AS patient_name,
    d.name AS doctor_name,
    d.department,
    a.time_slot,
    a.wait_time_minutes,
    ROUND(AVG(a.wait_time_minutes) OVER(PARTITION BY a.doctor_id), 1) AS doctor_avg_wait,
    CASE 
        WHEN a.wait_time_minutes > 30 THEN 'Severe Bottleneck'
        WHEN a.wait_time_minutes > 15 THEN 'Moderate Delay'
        ELSE 'On Schedule'
    END AS operational_flag
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
WHERE a.status = 'Completed'
ORDER BY a.wait_time_minutes DESC
LIMIT 8;
"""
        },
        {
            "id": 3,
            "title": "No-Show & Cancellation Correlation by Booking Lead Days",
            "description": "Groups bookings into lead-time tiers to analyze how far in advance patients book vs their likelihood to miss the appointment.",
            "sql": """
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
    ROUND((SUM(CASE WHEN status = 'No-Show' THEN 1 ELSE 0 END) * 100.0) / COUNT(appointment_id), 1) AS no_show_pct
FROM appointments
GROUP BY lead_time_bucket
ORDER BY total_bookings DESC;
"""
        },
        {
            "id": 4,
            "title": "Most Frequently Prescribed Medications & Patient Reach",
            "description": "Aggregates prescription counts, average treatment duration, and distinct patient counts across departments.",
            "sql": """
SELECT 
    pm.medicine_name,
    COUNT(pm.item_id) AS prescription_count,
    COUNT(DISTINCT pr.patient_id) AS unique_patients,
    ROUND(AVG(pm.duration_days), 1) AS avg_duration_days
FROM prescription_medicines pm
JOIN prescriptions pr ON pm.prescription_id = pr.prescription_id
GROUP BY pm.medicine_name
ORDER BY prescription_count DESC
LIMIT 6;
"""
        },
        {
            "id": 5,
            "title": "Automated Medication Reminder Delivery Performance",
            "description": "Evaluates delivery success rates across SMS and Email communication channels and identifies pending notifications.",
            "sql": """
SELECT 
    channel,
    reminder_type,
    COUNT(reminder_id) AS total_scheduled,
    SUM(CASE WHEN delivery_status = 'Delivered' THEN 1 ELSE 0 END) AS delivered_count,
    SUM(CASE WHEN delivery_status = 'Pending' THEN 1 ELSE 0 END) AS pending_count,
    ROUND((SUM(CASE WHEN delivery_status = 'Delivered' THEN 1 ELSE 0 END) * 100.0) / COUNT(reminder_id), 1) AS success_rate_pct
FROM medicine_reminders
GROUP BY channel, reminder_type
ORDER BY total_scheduled DESC;
"""
        }
    ]

    results = []
    for q in queries:
        try:
            cursor.execute(q["sql"])
            columns = [desc[0] for desc in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
            results.append({
                "id": q["id"],
                "title": q["title"],
                "description": q["description"],
                "sql": q["sql"].strip(),
                "columns": columns,
                "rows": rows,
                "row_count": len(rows)
            })
        except Exception as err:
            results.append({
                "id": q["id"],
                "title": q["title"],
                "description": q["description"],
                "sql": q["sql"].strip(),
                "error": str(err)
            })

    conn.close()
    return jsonify(results)

if __name__ == '__main__':
    print("[Python Healthcare API] Starting Flask REST service on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=False)
