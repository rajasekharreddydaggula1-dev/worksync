import { MdFlag, MdAccessTime } from 'react-icons/md';

const priorityColor = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-orange-100 text-orange-600',
  low: 'bg-green-100 text-green-600',
};

const priorityDot = { high: 'bg-red-500', medium: 'bg-orange-400', low: 'bg-green-500' };

function formatDate(date) {
  const d = new Date(date);
  const today = new Date();
  const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const avatarColors = ['from-blue-400 to-indigo-500', 'from-green-400 to-teal-500', 'from-purple-400 to-pink-500', 'from-orange-400 to-red-500', 'from-yellow-400 to-orange-500'];

export default function UpcomingTasks({ tasks }) {
  const upcoming = tasks
    .filter(t => t.status !== 'done' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-slate-800 font-bold text-base">Upcoming Tasks</h2>
          <p className="text-slate-400 text-xs mt-0.5">{upcoming.length} tasks due soon</p>
        </div>
        <button className="text-blue-500 text-xs font-semibold hover:underline">View all</button>
      </div>

      <ul className="space-y-2.5">
        {upcoming.map((task, i) => (
          <li key={task._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${priorityDot[task.priority]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-slate-700 text-sm font-medium truncate">{task.title}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MdAccessTime size={11} className="text-slate-400" />
                <span className={`text-xs font-medium ${formatDate(task.dueDate) === 'Today' ? 'text-red-500' : formatDate(task.dueDate) === 'Tomorrow' ? 'text-orange-500' : 'text-slate-400'}`}>
                  {formatDate(task.dueDate)}
                </span>
                {task.project && <span className="text-slate-300 text-xs">· {task.project}</span>}
              </div>
            </div>
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 shadow-sm`}>
              {task.assignee?.charAt(0) || '?'}
            </div>
          </li>
        ))}
        {upcoming.length === 0 && (
          <li className="text-center py-6 text-slate-400 text-sm">No upcoming tasks 🎉</li>
        )}
      </ul>
    </div>
  );
}
