import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

export default function StatsCard({ title, value, icon: Icon, iconBg, iconColor, growth, subtitle }) {
  const isPositive = growth >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={22} className={iconColor} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {isPositive ? <MdTrendingUp size={14} /> : <MdTrendingDown size={14} />}
          {Math.abs(growth)}%
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-slate-400 text-xs mt-0.5">vs last week</p>
    </div>
  );
}
