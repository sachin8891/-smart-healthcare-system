"""
Smart Healthcare System - Automated Medicine Reminder & Follow-Up Service
Simulates multi-channel SMS and Email notification dispatch,
automates dosage schedule alerts, and logs patient compliance follow-ups.
Developed by: Sachin Gurjar
"""

import os
import sqlite3
import datetime

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(CURRENT_DIR, "..", "database", "healthcare.db")

class MedicineReminderService:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path

    def _get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def get_all_reminders(self, status_filter=None):
        """Fetches all automated reminders with patient and medicine details."""
        conn = self._get_connection()
        query = """
        SELECT 
            r.reminder_id,
            r.prescription_id,
            r.patient_id,
            p.first_name || ' ' || p.last_name AS patient_name,
            p.email AS patient_email,
            p.phone AS patient_phone,
            r.channel,
            r.reminder_type,
            r.scheduled_time,
            r.message_content,
            r.delivery_status,
            r.sent_at,
            pr.diagnosis,
            d.name AS prescribing_doctor
        FROM medicine_reminders r
        JOIN patients p ON r.patient_id = p.patient_id
        JOIN prescriptions pr ON r.prescription_id = pr.prescription_id
        JOIN doctors d ON pr.doctor_id = d.doctor_id
        """
        if status_filter:
            query += f" WHERE r.delivery_status = '{status_filter}'"
        query += " ORDER BY r.reminder_id DESC;"

        cursor = conn.cursor()
        cursor.execute(query)
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

    def dispatch_pending_reminders(self):
        """
        Dispatches all pending automated SMS and Email reminders,
        updating their delivery status to 'Delivered' and logging the timestamp.
        """
        conn = self._get_connection()
        cursor = conn.cursor()

        # Find pending reminders
        cursor.execute("SELECT reminder_id, channel, patient_id FROM medicine_reminders WHERE delivery_status = 'Pending';")
        pending = cursor.fetchall()
        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        dispatched_count = 0
        for row in pending:
            r_id = row['reminder_id']
            cursor.execute(
                "UPDATE medicine_reminders SET delivery_status = 'Delivered', sent_at = ? WHERE reminder_id = ?;",
                (now_str, r_id)
            )
            dispatched_count += 1

        conn.commit()
        conn.close()
        return {
            'dispatched_count': dispatched_count,
            'timestamp': now_str,
            'status': 'Success'
        }

    def create_custom_reminder(self, prescription_id, patient_id, channel, reminder_type, scheduled_time, message):
        """Creates and schedules a new custom medication or follow-up reminder."""
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO medicine_reminders (prescription_id, patient_id, channel, reminder_type, scheduled_time, message_content, delivery_status, sent_at)
        VALUES (?, ?, ?, ?, ?, ?, 'Pending', NULL);
        """, (prescription_id, patient_id, channel, reminder_type, scheduled_time, message))
        new_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return {'success': True, 'reminder_id': new_id}

    def get_reminder_statistics(self):
        """Computes delivery rates, channel distributions, and queue health."""
        conn = self._get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM medicine_reminders;")
        total = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM medicine_reminders WHERE delivery_status = 'Delivered';")
        delivered = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM medicine_reminders WHERE delivery_status = 'Pending';")
        pending = cursor.fetchone()[0]

        cursor.execute("SELECT channel, COUNT(*) FROM medicine_reminders GROUP BY channel;")
        channels = {row[0]: row[1] for row in cursor.fetchall()}

        conn.close()

        delivery_rate = round((delivered / total) * 100, 1) if total > 0 else 0.0

        return {
            'total_reminders': total,
            'delivered_count': delivered,
            'pending_count': pending,
            'delivery_success_rate': delivery_rate,
            'channel_breakdown': channels
        }

if __name__ == "__main__":
    service = MedicineReminderService()
    print("Reminder Stats:", service.get_reminder_statistics())
    print("Pending Reminders Count:", len(service.get_all_reminders(status_filter='Pending')))
