import React from 'react';
import { Activity, Stethoscope, Bell, Sparkles, Database, Plus } from 'lucide-react';

export default function Header({ activeTab, onSelectTab, onOpenNewAppointment }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06B6D4, #4F46E5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)'
          }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Smart Healthcare System
              </h1>
              <span className="brand-badge">
                <Sparkles size={12} /> Live Ops & AI Analytics
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Appointment Scheduling • Prescription Intelligence • Automated Medication Reminders
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '0.8rem',
            color: 'var(--accent-emerald)',
            fontWeight: 600
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }}></span>
            Spring Boot (8081) & Python (5001) Connected
          </div>

          <button 
            className="btn-primary"
            onClick={onOpenNewAppointment}
          >
            <Plus size={16} /> Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}
