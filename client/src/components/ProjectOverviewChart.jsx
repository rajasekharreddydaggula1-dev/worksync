import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-xs">
      <p className="text-slate-700 font-semibold mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-700">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ProjectOverviewChart({ data }) {
  const [filter, setFilter] = useState('Weekly');
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-slate-800 font-bold text-base">Project Overview</h2>
          <p className="text-slate-400 text-xs mt-0.5">Task completion trends</p>
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {['Weekly', 'Monthly'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            formatter={(value) => <span style={{ color: '#64748B', fontWeight: 500 }}>{value}</span>}
          />
          <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={2.5} dot={false} name="Completed" />
          <Line type="monotone" dataKey="inProgress" stroke="#3B82F6" strokeWidth={2.5} dot={false} name="In Progress" />
          <Line type="monotone" dataKey="pending" stroke="#CBD5E1" strokeWidth={2.5} dot={false} name="To Do" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
