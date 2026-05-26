import { useState } from 'react';
import { MdSearch, MdMoreVert } from 'react-icons/md';

const statusStyle = {
  active: 'bg-blue-50 text-blue-600',
  completed: 'bg-green-50 text-green-600',
  'on-hold': 'bg-orange-50 text-orange-600',
};

const avatarColors = [
  'from-blue-400 to-indigo-500',
  'from-green-400 to-teal-500',
  'from-purple-400 to-pink-500',
  'from-orange-400 to-red-500',
  'from-yellow-400 to-orange-500',
];

export default function RecentProjects({ projects }) {
  const [search, setSearch] = useState('');
  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
      <div className="flex items-center justify-between mb-5 gap-3">
        <div>
          <h2 className="text-slate-800 font-bold text-base">Recent Projects</h2>
          <p className="text-slate-400 text-xs mt-0.5">{projects.length} total projects</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:border-blue-300 w-36 transition-all"
            />
          </div>
          <button className="text-blue-500 text-xs font-semibold hover:underline whitespace-nowrap">View all</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Project</th>
              <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Progress</th>
              <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden sm:table-cell">Tasks</th>
              <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden md:table-cell">Due Date</th>
              <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Team</th>
              <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(p => (
              <tr key={p._id} className="hover:bg-slate-50/70 transition-colors group">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: p.color + '20' }}>
                      <div className="w-3 h-3 rounded-sm" style={{ background: p.color }} />
                    </div>
                    <div>
                      <p className="text-slate-700 font-semibold text-sm">{p.name}</p>
                      <p className="text-slate-400 text-xs">{(p.members || []).length} members</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 pr-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-24">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.progress}%`, background: p.color }} />
                    </div>
                    <span className="text-slate-600 text-xs font-semibold w-8">{p.progress}%</span>
                  </div>
                </td>
                <td className="py-3.5 pr-4 hidden sm:table-cell">
                  <span className="text-slate-600 text-sm font-medium">{p.tasks}</span>
                </td>
                <td className="py-3.5 pr-4 hidden md:table-cell">
                  <span className="text-slate-500 text-sm">{p.dueDate}</span>
                </td>
                <td className="py-3.5 pr-4">
                  <div className="flex -space-x-1.5">
                    {(p.members || []).slice(0, 3).map((m, i) => (
                      <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm`}>
                        {m.charAt(0)}
                      </div>
                    ))}
                    {(p.members || []).length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-bold border-2 border-white">
                        +{p.members.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3.5 pr-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${statusStyle[p.status] || statusStyle.active}`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5">
                  <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-all">
                    <MdMoreVert size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
