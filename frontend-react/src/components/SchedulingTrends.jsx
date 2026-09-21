import React from 'react';
import { BarChart3, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function SchedulingTrends({ trends }) {
  if (!trends) return null;

  const { hourly_rush = [], day_of_week_trends = [], department_workload = [], lead_time_correlation = [] } = trends;

  const maxHourly = Math.max(...hourly_rush.map(h => h.total_bookings), 1);
  const maxDept = Math.max(...department_workload.map(d => d.total_bookings), 1);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Row: Hourly Rush & Lead Time */}
      <div className="grid-cols-2">
        {/* Hourly Rush Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Hourly Consultation Density & Wait Times
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Analysis of peak clinic rush hours vs average patient delay (NumPy & Pandas)
              </p>
            </div>
            <span className="badge badge-scheduled">
              <Clock size={12} /> Time Slot Distribution
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {hourly_rush.map((item, idx) => {
              const pct = (item.total_bookings / maxHourly) * 100;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.time_slot}</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      <strong style={{ color: 'var(--accent-cyan)' }}>{item.total_bookings}</strong> visits • Wait: {item.avg_wait_time}m
                    </span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                    <div 
                      style={{ 
                        width: `${pct}%`, 
                        background: item.avg_wait_time > 20 ? 'linear-gradient(90deg, #F59E0B, #F43F5E)' : 'linear-gradient(90deg, #06B6D4, #3B82F6)', 
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Time Correlation */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                No-Show Risk vs Booking Lead Days
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Correlation between advance booking window and appointment drop-out
              </p>
            </div>
            <span className="badge badge-noshow">
              <AlertCircle size={12} /> Risk Modeling
            </span>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Lead Window</th>
                  <th>Bookings</th>
                  <th>Completed</th>
                  <th>No-Show Rate</th>
                </tr>
              </thead>
              <tbody>
                {lead_time_correlation.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.lead_bucket}</td>
                    <td>{row.total_bookings}</td>
                    <td>{row.completed}</td>
                    <td>
                      <span className={`badge ${row.no_show_rate > 15 ? 'badge-noshow' : 'badge-completed'}`}>
                        {row.no_show_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Department Workload & Day of Week */}
      <div className="grid-cols-2">
        {/* Department Workload */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Specialty Department Capacity & Wait Times
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Workload volume, slot fulfillment, and average consultation durations
              </p>
            </div>
            <span className="badge badge-scheduled">
              <TrendingUp size={12} /> Specialty Analytics
            </span>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Appointments</th>
                  <th>Avg Wait</th>
                  <th>Consult Duration</th>
                  <th>Fulfillment</th>
                </tr>
              </thead>
              <tbody>
                {department_workload.map((dept, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.department}</td>
                    <td>{dept.total_bookings}</td>
                    <td style={{ color: dept.avg_wait_time > 20 ? 'var(--accent-rose)' : 'var(--text-secondary)', fontWeight: 600 }}>
                      {dept.avg_wait_time}m
                    </td>
                    <td>{dept.avg_consult_duration}m</td>
                    <td>
                      <span className="badge badge-completed">
                        {dept.utilization_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Day of Week Volume */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Day-of-Week Appointment Distribution
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Longitudinal patient flow across the outpatient clinical schedule
              </p>
            </div>
            <span className="badge badge-scheduled">
              <BarChart3 size={12} /> Weekly Trajectory
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {day_of_week_trends.map((day, idx) => {
              const maxDay = Math.max(...day_of_week_trends.map(d => d.total_appointments), 1);
              const pct = (day.total_appointments / maxDay) * 100;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{day.day_of_week}</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      <strong style={{ color: 'var(--accent-cyan)' }}>{day.total_appointments}</strong> patients • No-Show: {day.no_show_rate}%
                    </span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${pct}%`, 
                        background: 'linear-gradient(90deg, #10B981, #06B6D4)', 
                        borderRadius: '4px' 
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
