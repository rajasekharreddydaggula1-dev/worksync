import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg border border-surface-light rounded-lg p-3 text-xs">
      <p className="text-white font-semibold mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function ProjectOverviewChart({ data }) {
  const [filter, setFilter] = useState('weekly');
  return (
    <div className="bg-surface border border-surface-light rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold">Project Overview</h2>
        <div className="flex gap-1 bg-bg rounded-lg p-1">
          {['weekly', 'monthly'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
          <Line type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={2} dot={false} name="Completed" />
          <Line type="monotone" dataKey="inProgress" stroke="#f59e0b" strokeWidth={2} dot={false} name="In Progress" />
          <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={2} dot={false} name="Pending" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
