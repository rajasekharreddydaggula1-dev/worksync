import { MdCheckCircle, MdEdit, MdAddCircle, MdComment, MdSwapHoriz } from 'react-icons/md';

const typeConfig = {
  complete: { icon: MdCheckCircle, bg: 'bg-green-100', color: 'text-green-600' },
  update: { icon: MdSwapHoriz, bg: 'bg-blue-100', color: 'text-blue-600' },
  create: { icon: MdAddCircle, bg: 'bg-purple-100', color: 'text-purple-600' },
  comment: { icon: MdComment, bg: 'bg-orange-100', color: 'text-orange-600' },
  edit: { icon: MdEdit, bg: 'bg-slate-100', color: 'text-slate-500' },
};

const avatarColors = [
  'from-blue-400 to-indigo-500',
  'from-green-400 to-teal-500',
  'from-purple-400 to-pink-500',
  'from-orange-400 to-red-500',
  'from-yellow-400 to-orange-500',
];

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function TeamActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-slate-800 font-bold text-base">Team Activity</h2>
          <p className="text-slate-400 text-xs mt-0.5">Real-time updates</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-500 text-xs font-semibold">Live</span>
        </div>
      </div>

      <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {activities.map((a, i) => {
          const cfg = typeConfig[a.type] || typeConfig.edit;
          const Icon = cfg.icon;
          return (
            <li key={a._id || i} className="flex items-start gap-3 group">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}>
                {a.user?.charAt(0) || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-700 text-xs leading-relaxed">
                  <span className="font-semibold text-slate-800">{a.user}</span>
                  {' '}<span className="text-slate-500">{a.action}</span>{' '}
                  <span className="text-blue-500 font-medium">"{a.target}"</span>
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${cfg.bg}`}>
                    <Icon size={11} className={cfg.color} />
                  </div>
                  <span className="text-slate-400 text-[10px]">{timeAgo(a.time)}</span>
                </div>
              </div>
            </li>
          );
        })}
        {activities.length === 0 && (
          <li className="text-center py-6 text-slate-400 text-sm">No activity yet</li>
        )}
      </ul>
    </div>
  );
}
