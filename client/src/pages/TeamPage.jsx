import { useSelector } from 'react-redux';

const statusColor = { online: 'bg-green-400', offline: 'bg-slate-500', busy: 'bg-yellow-400' };

export default function TeamPage() {
  const users = useSelector(s => s.users);
  const tasks = useSelector(s => s.tasks);

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => {
          const userTasks = tasks.filter(t => t.assignee === user.name);
          const done = userTasks.filter(t => t.status === 'done').length;
          return (
            <div key={user._id} className="bg-surface border border-surface-light rounded-xl p-5 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface ${statusColor[user.status]}`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-slate-400 text-sm">{user.role}</p>
                  <p className="text-slate-500 text-xs capitalize">{user.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-bg rounded-lg p-2">
                  <p className="text-white font-bold">{userTasks.length}</p>
                  <p className="text-slate-500 text-xs">Tasks</p>
                </div>
                <div className="bg-bg rounded-lg p-2">
                  <p className="text-green-400 font-bold">{done}</p>
                  <p className="text-slate-500 text-xs">Done</p>
                </div>
                <div className="bg-bg rounded-lg p-2">
                  <p className="text-primary font-bold">{user.tasksCompleted || 0}</p>
                  <p className="text-slate-500 text-xs">Total</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
