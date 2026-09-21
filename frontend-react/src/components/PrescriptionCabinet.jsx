import React, { useState } from 'react';
import { Pill, Calendar, User, FileText, Clock, AlertCircle } from 'lucide-react';

export default function PrescriptionCabinet({ prescriptions = [] }) {
  const [selectedRx, setSelectedRx] = useState(prescriptions[0] || null);

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '1.5rem' }}>
      
      {/* Prescriptions List (Left Sidebar) */}
      <div className="glass-card" style={{ padding: '1.25rem', maxHeight: '720px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Pill size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Digital Prescriptions ({prescriptions.length})
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {prescriptions.map((rx) => {
            const isSelected = selectedRx?.prescription_id === rx.prescription_id;
            return (
              <div
                key={rx.prescription_id}
                onClick={() => setSelectedRx(rx)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {rx.prescription_code}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {rx.prescribed_date}
                  </span>
                </div>

                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {rx.patient_name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rx.diagnosis}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{rx.doctor_name}</span>
                  <span className="badge badge-completed" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                    {rx.medicines?.length || 0} Meds
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prescription Detail View (Right Panel) */}
      <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {selectedRx ? (
          <div>
            {/* Top Rx Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {selectedRx.prescription_code}
                  </span>
                  <span className="badge badge-scheduled">
                    Prescribed: {selectedRx.prescribed_date}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                  {selectedRx.patient_name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Blood Group: <strong>{selectedRx.blood_group || 'O+'}</strong> • Email: {selectedRx.patient_email}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedRx.doctor_name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)' }}>{selectedRx.department}</div>
                {selectedRx.follow_up_date && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', marginTop: '0.35rem', fontWeight: 600 }}>
                    Follow-up: {selectedRx.follow_up_date}
                  </div>
                )}
              </div>
            </div>

            {/* Diagnosis & Notes */}
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Primary Clinical Diagnosis
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedRx.diagnosis}
              </div>
              {selectedRx.clinical_notes && (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>
                  <strong>Doctor's Notes:</strong> {selectedRx.clinical_notes}
                </div>
              )}
            </div>

            {/* Prescribed Medicines Schedule */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Pill size={16} style={{ color: 'var(--accent-emerald)' }} />
                Prescribed Medicines & Dosage Regimen ({selectedRx.medicines?.length || 0})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedRx.medicines?.map((med, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.95rem 1.15rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                        {med.medicine_name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                        {med.frequency} • Dosage: {med.dosage}
                      </div>
                      {med.instructions && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Instructions: {med.instructions}
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-scheduled" style={{ fontSize: '0.75rem' }}>
                        <Clock size={12} /> {med.time_of_day}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                        Duration: <strong>{med.duration_days} days</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            Select a prescription to view details.
          </div>
        )}
      </div>

    </div>
  );
}
