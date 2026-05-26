import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdFolder, MdCheckBox, MdViewKanban,
  MdCalendarMonth, MdGroup, MdBarChart, MdNotifications,
  MdSettings, MdClose, MdBolt, MdWorkspaces, MdExpandMore,
} from 'react-icons/md';
import { RiRocketLine } from 'react-icons/ri';
import logo from '../assets/logo.jpeg';

const nav = [
  { to: '/', icon: MdDashboard, label: 'Dashboard' },
  { to: '/projects', icon: MdFolder, label: 'Projects' },
  { to: '/tasks', icon: MdCheckBox, label: 'Tasks' },
  { to: '/kanban', icon: MdViewKanban, label: 'Kanban Board' },
  { to: '/calendar', icon: MdCalendarMonth, label: 'Calendar' },
  { to: '/team', icon: MdGroup, label: 'Team' },
  { to: '/reports', icon: MdBarChart, label: 'Reports' },
  { to: '/notifications', icon: MdNotifications, label: 'Notifications' },
  { to: '/settings', icon: MdSettings, label: 'Settings' },
];

const workspaces = ['Design Team', 'Dev Squad', 'Marketing'];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0F172A] z-30 flex flex-col transition-transform duration-300 shadow-sidebar
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <img src={logo} alt="TaskFlow" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">TaskFlow</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <MdClose size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">Main Menu</p>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={19} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
                  <span>{label}</span>
                  {label === 'Notifications' && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Workspace */}
          <div className="pt-4">
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">Workspaces</p>
            {workspaces.map((ws) => (
              <button key={ws} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white text-sm transition-all">
                <MdWorkspaces size={16} className="text-slate-500" />
                <span>{ws}</span>
                <MdExpandMore size={16} className="ml-auto text-slate-600" />
              </button>
            ))}
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="px-3 pb-4">
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#1E1B4B] rounded-2xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <RiRocketLine size={14} className="text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Upgrade to Pro</span>
            </div>
            <p className="text-slate-400 text-xs mb-3 leading-relaxed">Unlock advanced analytics, unlimited projects & priority support.</p>
            <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 mt-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">KR</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Kamal Raja</p>
              <p className="text-slate-500 text-[10px] truncate">Project Manager</p>
            </div>
            <MdSettings size={15} className="text-slate-500 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
