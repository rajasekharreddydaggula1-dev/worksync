import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#22C55E', '#3B82F6', '#CBD5E1'];
const LABELS = ['Completed', 'In Progress', 'To Do'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-lg text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: payload[0].payload.fill }} />
        <span className="text-slate-600">{payload[0].name}:</span>
        <span className="font-bold text-slate-800">{payload[0].value}</span>
      </div>
    </div>
  );
};

export default function TaskPieChart({ completed, inProgress, todo }) {
  const total = completed + inProgress + todo;
  const data = [
    { name: 'Completed', value: completed },
    { name: 'In Progress', value: inProgress },
    { name: 'To Do', value: todo },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
      <div className="mb-4">
        <h2 className="text-slate-800 font-bold text-base">Tasks by Status</h2>
        <p className="text-slate-400 text-xs mt-0.5">Overall distribution</p>
      </div>

      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={58} outerRadius={82} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} strokeWidth={0} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold text-slate-800">{total}</p>
          <p className="text-slate-400 text-xs font-medium">Total</p>
        </div>
      </div>

      <div className="space-y-2.5 mt-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
              <span className="text-slate-600 text-xs font-medium">{d.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: `${Math.round((d.value / total) * 100)}%`, background: COLORS[i] }} />
              </div>
              <span className="text-slate-500 text-xs w-8 text-right">{Math.round((d.value / total) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
