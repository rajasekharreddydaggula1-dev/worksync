import { MdCheckCircle, MdEdit, MdAddCircle, MdComment, MdSwapHoriz } from 'react-icons/md';

const icons = {
  complete: { icon: MdCheckCircle, color: 'text-green-400 bg-green-900/30' },
  update: { icon: MdSwapHoriz, color: 'text-yellow-400 bg-yellow-900/30' },
  create: { icon: MdAddCircle, color: 'text-blue-400 bg-blue-900/30' },
  comment: { icon: MdComment, color: 'text-purple-400 bg-purple-900/30' },
  edit: { icon: MdEdit, color: 'text-slate-400 bg-slate-700' },
};

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function TeamActivity({ activities }) {
  return (
    <div className="bg-surface border border-surface-light rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Team Activity</h2>
        <span className="flex items-center gap-1.5 text-xs text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      </div>
      <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {activities.map((a, i) => {
          const cfg = icons[a.type] || icons.edit;
          const Icon = cfg.icon;
          return (
            <li key={a._id || i} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-xs">
                  <span className="text-white font-medium">{a.user}</span>
                  {' '}{a.action}{' '}
                  <span className="text-primary">"{a.target}"</span>
                </p>
                <p className="text-slate-500 text-xs mt-0.5">{timeAgo(a.time)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
