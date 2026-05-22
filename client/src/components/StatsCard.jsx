import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

export default function StatsCard({ title, value, icon: Icon, color, growth, subtitle }) {
  const isPositive = growth >= 0;
  return (
    <div className="bg-surface border border-surface-light rounded-xl p-5 flex flex-col gap-3 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {growth !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <MdTrendingUp size={16} /> : <MdTrendingDown size={16} />}
          <span>{Math.abs(growth)}% from last week</span>
        </div>
      )}
    </div>
  );
}
