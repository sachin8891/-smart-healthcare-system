import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle2, TrendingUp, ArrowRight, ShieldAlert } from 'lucide-react';

export default function InsightsStudio({ insightsData }) {
  if (!insightsData) return null;

  const { insights = [], overall_status } = insightsData;

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'High':
        return { bg: 'rgba(244, 63, 94, 0.15)', text: 'var(--accent-rose)', border: 'rgba(244, 63, 94, 0.3)', icon: ShieldAlert };
      case 'Medium':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: 'var(--accent-amber)', border: 'rgba(245, 158, 11, 0.3)', icon: AlertTriangle };
      default:
        return { bg: 'rgba(6, 182, 212, 0.15)', text: 'var(--accent-cyan)', border: 'rgba(6, 182, 212, 0.3)', icon: CheckCircle2 };
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(99, 102, 241, 0.08))',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#090D16',
            boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)'
          }}>
            <Lightbulb size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Data-Driven Process Improvement Engine
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Automated operational diagnostics derived from statistical patterns in appointment wait times and schedules
            </p>
          </div>
        </div>

        <span className="badge badge-scheduled" style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
          {overall_status}
        </span>
      </div>

      {/* Insights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.25rem' }}>
        {insights.map((ins, idx) => {
          const sev = getSeverityBadge(ins.severity);
          const SevIcon = sev.icon;

          return (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {ins.id} • {ins.department}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {ins.category}
                    </h3>
                  </div>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: sev.bg,
                    color: sev.text,
                    border: `1px solid ${sev.border}`
                  }}>
                    <SevIcon size={13} /> {ins.severity} Priority
                  </span>
                </div>

                {/* Finding */}
                <div style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Observed Metric & Finding:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {ins.finding}
                  </p>
                </div>

                {/* Root Cause */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Root Cause Analysis:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {ins.root_cause}
                  </p>
                </div>

                {/* Recommended Action */}
                <div style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Recommended Operational Process Change:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4, fontWeight: 500 }}>
                    {ins.recommended_action}
                  </p>
                </div>
              </div>

              {/* Projected Impact */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--accent-indigo)'
              }}>
                <TrendingUp size={16} />
                <span><strong>Projected ROI:</strong> {ins.projected_impact}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
