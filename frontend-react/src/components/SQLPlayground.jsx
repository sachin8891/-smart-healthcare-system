import React, { useState, useEffect } from 'react';
import { Database, Play, Code2, CheckCircle2 } from 'lucide-react';

export default function SQLPlayground({ queries = [] }) {
  const [selectedId, setSelectedId] = useState(queries[0]?.id || 1);

  const currentQuery = queries.find(q => q.id === selectedId) || queries[0];

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '1.5rem' }}>
      
      {/* Queries List (Left) */}
      <div className="glass-card" style={{ padding: '1.25rem', maxHeight: '720px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Database size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Analytical SQL Suite ({queries.length})
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {queries.map((q) => {
            const isSelected = q.id === selectedId;
            return (
              <div
                key={q.id}
                onClick={() => setSelectedId(q.id)}
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
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
                  QUERY #{q.id}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  {q.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.3 }}>
                  {q.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Query Detail & Execution Table (Right) */}
      <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {currentQuery ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-scheduled" style={{ marginBottom: '0.5rem' }}>
                  Query #{currentQuery.id}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {currentQuery.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  {currentQuery.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> Executed Live against Database ({currentQuery.row_count || 0} rows)
              </div>
            </div>

            {/* SQL Code Block */}
            <div style={{
              background: '#040711',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              padding: '1rem',
              overflowX: 'auto',
              marginBottom: '1.5rem',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '0.8rem',
              color: '#38BDF8',
              lineHeight: 1.5
            }}>
              <pre>{currentQuery.sql}</pre>
            </div>

            {/* Results Table */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Query Execution Results
              </h4>

              <div className="table-container" style={{ maxHeight: '380px', overflowY: 'auto' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      {currentQuery.columns?.map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuery.rows?.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {currentQuery.columns?.map((col, cIdx) => (
                          <td key={cIdx}>
                            {String(row[col] ?? '—')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>

    </div>
  );
}
