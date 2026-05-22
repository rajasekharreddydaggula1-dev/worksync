import { MdAccessTime, MdFlag } from 'react-icons/md';

const priorityColor = { high: 'text-red-400', medium: 'text-yellow-400', low: 'text-green-400' };
const statusBg = { todo: 'bg-slate-700 text-slate-300', 'in-progress': 'bg-yellow-900/50 text-yellow-300', done: 'bg-green-900/50 text-green-300' };

function daysLeft(date) {
  const diff = Math.ceil((new Date(date) - new Date()) / 86400000);
  if (diff < 0) return <span className="text-red-400 text-xs">Overdue</span>;
  if (diff === 0) return <span className="text-yellow-400 text-xs">Due today</span>;
  return <span className="text-slate-400 text-xs">{diff}d left</span>;
}

export default function UpcomingTasks({ tasks }) {
  const upcoming = tasks
    .filter(t => t.status !== 'done' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 6);

  return (
    <div className="bg-surface border border-surface-light rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Upcoming Tasks</h2>
      <ul className="space-y-3">
        {upcoming.map(task => (
          <li key={task._id} className="flex items-start gap-3 p-3 bg-bg rounded-lg hover:bg-surface-light/50 transition-colors">
            <MdFlag size={16} className={`mt-0.5 flex-shrink-0 ${priorityColor[task.priority]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{task.title}</p>
              <p className="text-slate-500 text-xs truncate">{task.project}</p>
              <div className="flex items-center gap-2 mt-1">
                <MdAccessTime size={12} className="text-slate-500" />
                {daysLeft(task.dueDate)}
                <span className={`text-xs px-1.5 py-0.5 rounded ${statusBg[task.status]}`}>{task.status}</span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
              {task.assignee?.charAt(0)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
