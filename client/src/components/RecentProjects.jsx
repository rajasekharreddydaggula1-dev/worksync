import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const statusBadge = { active: 'bg-blue-900/50 text-blue-300', completed: 'bg-green-900/50 text-green-300' };

export default function RecentProjects({ projects }) {
  const [search, setSearch] = useState('');
  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-surface border border-surface-light rounded-xl p-5">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="text-white font-semibold">Recent Projects</h2>
        <div className="relative">
          <MdSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter..."
            className="bg-bg border border-surface-light rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-primary w-36"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs border-b border-surface-light">
              <th className="text-left pb-3 font-medium">Project</th>
              <th className="text-left pb-3 font-medium">Progress</th>
              <th className="text-left pb-3 font-medium hidden sm:table-cell">Tasks</th>
              <th className="text-left pb-3 font-medium hidden md:table-cell">Due Date</th>
              <th className="text-left pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-light/50">
            {filtered.map(p => (
              <tr key={p._id} className="hover:bg-surface-light/30 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-white font-medium text-xs truncate max-w-[120px]">{p.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-bg rounded-full h-1.5 w-20">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.progress}%`, background: p.color }} />
                    </div>
                    <span className="text-slate-400 text-xs w-8">{p.progress}%</span>
                  </div>
                </td>
                <td className="py-3 pr-4 hidden sm:table-cell text-slate-400 text-xs">{p.tasks}</td>
                <td className="py-3 pr-4 hidden md:table-cell text-slate-400 text-xs">{p.dueDate}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[p.status]}`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
