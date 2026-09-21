import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnalyticsKPIs from './components/AnalyticsKPIs';
import SchedulingTrends from './components/SchedulingTrends';
import InsightsStudio from './components/InsightsStudio';
import AppointmentManager from './components/AppointmentManager';
import PrescriptionCabinet from './components/PrescriptionCabinet';
import ReminderConsole from './components/ReminderConsole';
import SQLPlayground from './components/SQLPlayground';
import { 
  BarChart3, 
  Calendar, 
  Pill, 
  Lightbulb, 
  Bell, 
  Database,
  Activity,
  PlusCircle,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [kpis, setKpis] = useState(null);
  const [trends, setTrends] = useState(null);
  const [insights, setInsights] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [sqlQueries, setSqlQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Appointment Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState('');
  const [newDoctor, setNewDoctor] = useState('Dr. Arvind Sharma (Cardiology)');
  const [newDate, setNewDate] = useState('2026-09-18');
  const [newSlot, setNewSlot] = useState('10:00 AM');
  const [newSymptoms, setNewSymptoms] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. KPIs
      const kRes = await fetch('http://localhost:5001/api/analytics/kpis');
      if (kRes.ok) setKpis(await kRes.json());

      // 2. Trends
      const tRes = await fetch('http://localhost:5001/api/analytics/trends');
      if (tRes.ok) setTrends(await tRes.json());

      // 3. Insights
      const iRes = await fetch('http://localhost:5001/api/analytics/insights');
      if (iRes.ok) setInsights(await iRes.json());

      // 4. Appointments
      const aRes = await fetch('http://localhost:5001/api/appointments/list');
      if (aRes.ok) setAppointments(await aRes.json());

      // 5. Prescriptions
      const pRes = await fetch('http://localhost:5001/api/prescriptions/list');
      if (pRes.ok) setPrescriptions(await pRes.json());

      // 6. Reminders
      const rRes = await fetch('http://localhost:5001/api/reminders/list');
      if (rRes.ok) setReminders(await rRes.json());

      // 7. SQL Queries
      const sRes = await fetch('http://localhost:5001/api/analytics/sql-queries');
      if (sRes.ok) setSqlQueries(await sRes.json());

    } catch (e) {
      console.error('Error fetching healthcare data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDispatchReminders = async () => {
    const res = await fetch('http://localhost:5001/api/reminders/dispatch', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      // Reload reminders and KPIs
      const rRes = await fetch('http://localhost:5001/api/reminders/list');
      if (rRes.ok) setReminders(await rRes.json());

      const kRes = await fetch('http://localhost:5001/api/analytics/kpis');
      if (kRes.ok) setKpis(await kRes.json());

      return data;
    }
    throw new Error('Failed to dispatch reminders');
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newPatient.trim()) return;

    const [docName, docDept] = newDoctor.split(' (');
    const cleanDept = (docDept || 'General Medicine').replace(')', '');

    const newAppt = {
      appointment_id: appointments.length + 1,
      appointment_code: `APT-2026-0${appointments.length + 1}`,
      patient_id: 1,
      patient_name: newPatient,
      patient_phone: '+91 9928486513',
      doctor_id: 1,
      doctor_name: docName,
      department: cleanDept,
      appointment_date: newDate,
      time_slot: newSlot,
      status: 'Scheduled',
      symptoms: newSymptoms || 'Consultation follow-up',
      wait_time_minutes: 0,
      consultation_duration: 15,
      booking_channel: 'Online Portal'
    };

    setAppointments([newAppt, ...appointments]);
    setIsModalOpen(false);
    setNewPatient('');
    setNewSymptoms('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenNewAppointment={() => setIsModalOpen(true)}
      />

      <main className="container" style={{ flex: 1 }}>
        {/* Navigation Tabs */}
        <div className="tabs-nav">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={16} /> Scheduling Trends & Analytics
          </button>

          <button 
            className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <Lightbulb size={16} /> Data-Driven Process Insights
          </button>

          <button 
            className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <Calendar size={16} /> Appointment Management ({appointments.length})
          </button>

          <button 
            className={`tab-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            <Pill size={16} /> Digital Prescriptions ({prescriptions.length})
          </button>

          <button 
            className={`tab-btn ${activeTab === 'reminders' ? 'active' : ''}`}
            onClick={() => setActiveTab('reminders')}
          >
            <Bell size={16} /> Automated Reminders ({reminders.length})
          </button>

          <button 
            className={`tab-btn ${activeTab === 'sql' ? 'active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            <Database size={16} /> SQL Query Suite ({sqlQueries.length})
          </button>
        </div>

        {/* Global KPIs Bar (shown across tabs) */}
        <AnalyticsKPIs kpis={kpis} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <SchedulingTrends trends={trends} />
        )}

        {activeTab === 'insights' && (
          <InsightsStudio insightsData={insights} />
        )}

        {activeTab === 'appointments' && (
          <AppointmentManager appointments={appointments} />
        )}

        {activeTab === 'prescriptions' && (
          <PrescriptionCabinet prescriptions={prescriptions} />
        )}

        {activeTab === 'reminders' && (
          <ReminderConsole 
            reminders={reminders} 
            onDispatchPending={handleDispatchReminders} 
          />
        )}

        {activeTab === 'sql' && (
          <SQLPlayground queries={sqlQueries} />
        )}
      </main>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '1.75rem', border: '1px solid var(--border-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PlusCircle size={20} style={{ color: 'var(--accent-cyan)' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Schedule New Appointment
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sachin Gurjar"
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Doctor & Department
                </label>
                <select
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: '#0F172A',
                    border: '1px solid var(--border-subtle)',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Dr. Arvind Sharma (Cardiology)">Dr. Arvind Sharma (Cardiology)</option>
                  <option value="Dr. Radhika Kapoor (Neurology)">Dr. Radhika Kapoor (Neurology)</option>
                  <option value="Dr. Sameer Verma (Pediatrics)">Dr. Sameer Verma (Pediatrics)</option>
                  <option value="Dr. Meena Swaminathan (Orthopedics)">Dr. Meena Swaminathan (Orthopedics)</option>
                  <option value="Dr. Rajesh Deshmukh (General Medicine)">Dr. Rajesh Deshmukh (General Medicine)</option>
                  <option value="Dr. Ananya Roy (Dermatology)">Dr. Ananya Roy (Dermatology)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      color: 'white',
                      fontFamily: 'inherit',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Time Slot
                  </label>
                  <select
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: '#0F172A',
                      border: '1px solid var(--border-subtle)',
                      color: 'white',
                      fontFamily: 'inherit',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Symptoms / Reason for Visit
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe patient symptoms..."
                  value={newSymptoms}
                  onChange={(e) => setNewSymptoms(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Smart Healthcare Appointment & Prescription System • Portfolio Project Developed by <strong>Sachin Gurjar</strong> • Tech Stack: Python, Pandas, NumPy, SQL, MySQL, Java, Spring Boot
      </footer>
    </div>
  );
}
