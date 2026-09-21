import React, { useState } from 'react';
import { Bell, Send, CheckCircle2, Clock, Mail, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';

export default function ReminderConsole({ reminders = [], onDispatchPending, refreshing }) {
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [dispatching, setDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(null);

  const filtered = reminders.filter(r => {
    if (channelFilter === 'ALL') return true;
    return r.channel === channelFilter;
  });

  const pendingCount = reminders.filter(r => r.delivery_status === 'Pending').length;
  const deliveredCount = reminders.filter(r => r.delivery_status === 'Delivered').length;

  const handleDispatch = async () => {
    setDispatching(true);
    setDispatchSuccess(null);
    try {
      const res = await onDispatchPending();
      setDispatchSuccess(res);
      setTimeout(() => setDispatchSuccess(null), 5000);
    } catch (e) {
      console.error(e);
    } finally {
      setDispatching(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner with Dispatch Button */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.08))',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'var(--accent-indigo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Bell size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Automated Medication Reminder & Patient Follow-up Engine
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Multi-channel notification dispatcher simulating automated SMS alerts and Email reminders
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Queue</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: pendingCount > 0 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>
              {pendingCount} Reminders
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleDispatch}
            disabled={dispatching || pendingCount === 0}
            style={{
              background: pendingCount === 0 ? 'rgba(51, 65, 85, 0.5)' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              boxShadow: pendingCount === 0 ? 'none' : '0 4px 15px rgba(99, 102, 241, 0.4)',
              cursor: pendingCount === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {dispatching ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Dispatching...
              </>
            ) : (
              <>
                <Send size={16} /> Dispatch All Pending ({pendingCount})
              </>
            )}
          </button>
        </div>
      </div>

      {dispatchSuccess && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--accent-emerald)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          Successfully dispatched {dispatchSuccess.dispatched_count} pending notifications at {dispatchSuccess.timestamp}! Delivery status updated.
        </div>
      )}

      {/* Filter and Queue Details */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ALL', 'SMS', 'Email'].map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: channelFilter === ch ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                background: channelFilter === ch ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: channelFilter === ch ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {ch}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filtered.length}</strong> of <strong>{reminders.length}</strong> notifications
        </div>
      </div>

      {/* Reminders Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((item) => (
          <div key={item.reminder_id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: item.channel === 'SMS' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                    color: item.channel === 'SMS' ? 'var(--accent-cyan)' : 'var(--accent-indigo)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.channel === 'SMS' ? <MessageSquare size={16} /> : <Mail size={16} />}
                  </span>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {item.patient_name}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.channel === 'SMS' ? item.patient_phone : item.patient_email}
                    </div>
                  </div>
                </div>

                <span className={`badge ${item.delivery_status === 'Delivered' ? 'badge-completed' : 'badge-scheduled'}`}>
                  {item.delivery_status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {item.delivery_status}
                </span>
              </div>

              {/* Message Bubble Simulator */}
              <div style={{
                padding: '0.95rem 1rem',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                position: 'relative',
                marginBottom: '0.85rem'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                  SIMULATED {item.channel.toUpperCase()} PAYLOAD • {item.reminder_type}
                </div>
                "{item.message_content}"
              </div>
            </div>

            {/* Card Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <span>Scheduled: <strong>{item.scheduled_time}</strong></span>
              <span>{item.sent_at ? `Sent at ${item.sent_at}` : 'Awaiting dispatch'}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
