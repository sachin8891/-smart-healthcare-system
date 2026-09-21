import React from 'react';
import { Calendar, Clock, UserX, CheckCircle2, DollarSign, Bell } from 'lucide-react';

export default function AnalyticsKPIs({ kpis }) {
  if (!kpis) return null;

  const cards = [
    {
      label: 'Total Appointments',
      value: kpis.total_appointments || 0,
      subtext: `${kpis.completed_count || 0} completed • ${kpis.scheduled_count || 0} upcoming`,
      icon: Calendar,
      color: 'var(--accent-cyan)',
      glow: 'var(--accent-cyan-glow)'
    },
    {
      label: 'Avg Patient Wait Time',
      value: `${kpis.avg_wait_time_minutes || 0}m`,
      subtext: `p90: ${kpis.p90_wait_time_minutes || 0}m • Std Dev: ±${kpis.std_wait_time_minutes || 0}m`,
      icon: Clock,
      color: 'var(--accent-amber)',
      glow: 'var(--accent-amber-glow)'
    },
    {
      label: 'No-Show Rate',
      value: `${kpis.no_show_rate_percent || 0}%`,
      subtext: `${kpis.no_show_count || 0} missed • ${kpis.cancelled_count || 0} cancelled`,
      icon: UserX,
      color: 'var(--accent-rose)',
      glow: 'var(--accent-rose-glow)'
    },
    {
      label: 'Fulfillment Rate',
      value: `${kpis.completion_rate_percent || 0}%`,
      subtext: 'High clinic efficiency index',
      icon: CheckCircle2,
      color: 'var(--accent-emerald)',
      glow: 'var(--accent-emerald-glow)'
    },
    {
      label: 'Automated Reminders',
      value: kpis.reminder_stats?.delivered_count || 0,
      subtext: `${kpis.reminder_stats?.delivery_success_rate || 0}% delivery success rate`,
      icon: Bell,
      color: 'var(--accent-indigo)',
      glow: 'rgba(99, 102, 241, 0.2)'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {card.label}
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: card.glow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color
              }}>
                <Icon size={18} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
