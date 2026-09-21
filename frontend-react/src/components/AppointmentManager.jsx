import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, User, Phone, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function AppointmentManager({ appointments = [] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = appointments.filter(a => {
    const matchesSearch = 
      (a.patient_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.doctor_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.department || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.appointment_code || '').toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge badge-completed"><CheckCircle2 size={12} /> Completed</span>;
      case 'No-Show':
        return <span className="badge badge-noshow"><XCircle size={12} /> No-Show</span>;
      case 'Cancelled':
        return <span className="badge badge-cancelled"><AlertTriangle size={12} /> Cancelled</span>;
      default:
        return <span className="badge badge-scheduled"><Clock size={12} /> Scheduled</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Controls Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search by patient, doctor, department, or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.25rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['ALL', 'Completed', 'Scheduled', 'No-Show', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: statusFilter === st ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                background: statusFilter === st ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: statusFilter === st ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Patient Details</th>
                <th>Doctor & Specialty</th>
                <th>Date & Slot</th>
                <th>Wait Time</th>
                <th>Symptoms / Diagnosis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No appointments matching search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.appointment_id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                      {item.appointment_code}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.patient_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.patient_phone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.doctor_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)' }}>{item.department}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{item.appointment_date}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time_slot}</div>
                    </td>
                    <td>
                      {item.status === 'Completed' ? (
                        <span style={{ fontWeight: 600, color: item.wait_time_minutes > 20 ? 'var(--accent-rose)' : 'var(--text-secondary)' }}>
                          {item.wait_time_minutes} mins
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td style={{ maxWidth: '280px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {item.symptoms || 'General clinical consultation'}
                    </td>
                    <td>
                      {getStatusBadge(item.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
