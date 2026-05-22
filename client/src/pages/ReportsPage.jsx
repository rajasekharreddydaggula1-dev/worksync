import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg border border-surface-light rounded-lg p-3 text-xs">
      <p className="text-white font-semibold mb-1">{label}</p>
      {payload.map(p => <p key={p.name} style={{ color: p.fill }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function ReportsPage() {
  const tasks = useSelector(s => s.tasks);
  const projects = useSelector(s => s.projects);
  const users = useSelector(s => s.users);

  const memberData = users.map(u => ({
    name: u.name.split(' ')[0],
    completed: tasks.filter(t => t.assignee === u.name && t.status === 'done').length,
    inProgress: tasks.filter(t => t.assignee === u.name && t.status === 'in-progress').length,
    todo: tasks.filter(t => t.assignee === u.name && t.status === 'todo').length,
  }));

  const projectData = projects.map(p => ({ name: p.name.split(' ')[0], progress: p.progress }));

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-light rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Tasks by Team Member</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={memberData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="inProgress" fill="#f59e0b" radius={[4, 4, 0, 0]} name="In Progress" />
              <Bar dataKey="todo" fill="#475569" radius={[4, 4, 0, 0]} name="To Do" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-surface-light rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Project Progress</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={projectData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="progress" fill="#6366f1" radius={[0, 4, 4, 0]} name="Progress %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
