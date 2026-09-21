"""
Smart Healthcare System - Appointment Analytics Engine
Uses Python, Pandas, and NumPy to clean, transform, and analyze structured appointment data,
identifying scheduling trends, wait-time distributions, and doctor workload metrics.
Developed by: Sachin Gurjar
"""

import os
import sqlite3
import pandas as pd
import numpy as np

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(CURRENT_DIR, "..", "database", "healthcare.db")

class AppointmentAnalytics:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def load_clean_data(self):
        """Loads and cleans relational data into Pandas DataFrames."""
        conn = self._get_connection()
        query = """
        SELECT 
            a.appointment_id,
            a.appointment_code,
            a.patient_id,
            p.first_name || ' ' || p.last_name AS patient_name,
            p.gender AS patient_gender,
            p.blood_group,
            a.doctor_id,
            d.name AS doctor_name,
            d.specialization,
            d.department,
            d.consultation_fee,
            a.appointment_date,
            a.time_slot,
            a.status,
            a.symptoms,
            a.wait_time_minutes,
            a.consultation_duration,
            a.booking_lead_days,
            a.booking_channel
        FROM appointments a
        JOIN patients p ON a.patient_id = p.patient_id
        JOIN doctors d ON a.doctor_id = d.doctor_id;
        """
        df = pd.read_sql_query(query, conn)
        conn.close()

        # Data Cleaning & Feature Engineering with Pandas
        df['appointment_date'] = pd.to_datetime(df['appointment_date'])
        df['day_of_week'] = df['appointment_date'].dt.day_name()
        df['is_weekend'] = df['appointment_date'].dt.dayofweek >= 5

        # Extract standard 24-hr hour block for time slot
        # e.g., '09:00 AM' -> 9, '11:00 AM' -> 11
        df['hour_block'] = df['time_slot'].apply(lambda x: int(x.split(':')[0]) if x else 9)

        # Flag no-show and cancellations
        df['is_no_show'] = (df['status'] == 'No-Show').astype(int)
        df['is_completed'] = (df['status'] == 'Completed').astype(int)
        df['is_cancelled'] = (df['status'] == 'Cancelled').astype(int)

        return df

    def compute_summary_kpis(self):
        """Calculates executive KPI metrics using Pandas and NumPy."""
        df = self.load_clean_data()
        total_appointments = len(df)
        completed_count = int(df['is_completed'].sum())
        no_show_count = int(df['is_no_show'].sum())
        cancelled_count = int(df['is_cancelled'].sum())
        scheduled_count = int((df['status'] == 'Scheduled').sum())

        no_show_rate = round((no_show_count / total_appointments) * 100, 1) if total_appointments > 0 else 0.0
        completion_rate = round((completed_count / total_appointments) * 100, 1) if total_appointments > 0 else 0.0

        # Wait-time statistics on completed appointments using NumPy
        completed_df = df[df['status'] == 'Completed']
        wait_times = completed_df['wait_time_minutes'].to_numpy()

        if len(wait_times) > 0:
            avg_wait = round(float(np.mean(wait_times)), 1)
            median_wait = round(float(np.median(wait_times)), 1)
            std_wait = round(float(np.std(wait_times)), 1)
            p90_wait = round(float(np.percentile(wait_times, 90)), 1)
        else:
            avg_wait = median_wait = std_wait = p90_wait = 0.0

        # Total revenue generated
        total_revenue = float(completed_df['consultation_fee'].sum())

        return {
            'total_appointments': total_appointments,
            'completed_count': completed_count,
            'scheduled_count': scheduled_count,
            'no_show_count': no_show_count,
            'cancelled_count': cancelled_count,
            'no_show_rate_percent': no_show_rate,
            'completion_rate_percent': completion_rate,
            'avg_wait_time_minutes': avg_wait,
            'median_wait_time_minutes': median_wait,
            'p90_wait_time_minutes': p90_wait,
            'std_wait_time_minutes': std_wait,
            'total_revenue_inr': total_revenue
        }

    def analyze_hourly_rush(self):
        """Analyzes peak rush hours and volume distribution by time slot."""
        df = self.load_clean_data()
        
        # Group by time slot
        hourly_summary = df.groupby('time_slot').agg(
            total_bookings=('appointment_id', 'count'),
            completed=('is_completed', 'sum'),
            no_shows=('is_no_show', 'sum'),
            cancelled=('is_cancelled', 'sum'),
            avg_wait_time=('wait_time_minutes', lambda x: round(x[x > 0].mean() if len(x[x > 0]) > 0 else 0, 1))
        ).reset_index()

        # Sort chronologically by converting to hour
        hourly_summary['hour_val'] = hourly_summary['time_slot'].apply(
            lambda x: int(x.split(':')[0]) + (12 if 'PM' in x and not x.startswith('12') else 0)
        )
        hourly_summary = hourly_summary.sort_values('hour_val').drop(columns=['hour_val'])

        return hourly_summary.to_dict(orient='records')

    def analyze_day_of_week_trends(self):
        """Analyzes day-of-week trends and booking channel distributions."""
        df = self.load_clean_data()
        
        day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        day_summary = df.groupby('day_of_week').agg(
            total_appointments=('appointment_id', 'count'),
            completed=('is_completed', 'sum'),
            no_shows=('is_no_show', 'sum'),
            avg_wait_time=('wait_time_minutes', lambda x: round(x[x > 0].mean() if len(x[x > 0]) > 0 else 0, 1))
        ).reset_index()

        day_summary['day_of_week'] = pd.Categorical(day_summary['day_of_week'], categories=day_order, ordered=True)
        day_summary = day_summary.sort_values('day_of_week').dropna()
        day_summary['no_show_rate'] = round((day_summary['no_shows'] / day_summary['total_appointments']) * 100, 1)

        return day_summary.to_dict(orient='records')

    def analyze_department_workload(self):
        """Analyzes workload, fulfillment rates, and average wait times by medical department."""
        df = self.load_clean_data()
        
        dept_summary = df.groupby('department').agg(
            total_bookings=('appointment_id', 'count'),
            completed=('is_completed', 'sum'),
            no_shows=('is_no_show', 'sum'),
            avg_wait_time=('wait_time_minutes', lambda x: round(x[x > 0].mean() if len(x[x > 0]) > 0 else 0, 1)),
            avg_consult_duration=('consultation_duration', lambda x: round(x[x > 0].mean() if len(x[x > 0]) > 0 else 0, 1))
        ).reset_index()

        dept_summary['utilization_rate'] = round((dept_summary['completed'] / dept_summary['total_bookings']) * 100, 1)
        dept_summary = dept_summary.sort_values('total_bookings', ascending=False)

        return dept_summary.to_dict(orient='records')

    def analyze_lead_time_correlation(self):
        """Analyzes relationship between booking lead time (days) and no-show rate."""
        df = self.load_clean_data()
        
        # Categorize into lead time buckets
        def categorize_lead(days):
            if days <= 1:
                return "0-1 Day (Urgent/Walk-in)"
            elif days <= 4:
                return "2-4 Days (Short Lead)"
            elif days <= 7:
                return "5-7 Days (Medium Lead)"
            else:
                return "8+ Days (Long Advance)"

        df['lead_bucket'] = df['booking_lead_days'].apply(categorize_lead)

        bucket_summary = df.groupby('lead_bucket').agg(
            total_bookings=('appointment_id', 'count'),
            completed=('is_completed', 'sum'),
            no_shows=('is_no_show', 'sum'),
            cancelled=('is_cancelled', 'sum')
        ).reset_index()

        bucket_summary['no_show_rate'] = round((bucket_summary['no_shows'] / bucket_summary['total_bookings']) * 100, 1)
        return bucket_summary.to_dict(orient='records')

if __name__ == "__main__":
    analytics = AppointmentAnalytics()
    print("Summary KPIs:", analytics.compute_summary_kpis())
    print("Hourly Rush (Sample):", analytics.analyze_hourly_rush()[:2])
