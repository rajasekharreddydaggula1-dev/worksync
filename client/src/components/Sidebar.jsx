import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdFolder, MdCheckBox,
  MdGroup, MdNotifications,
  MdSettings, MdClose,
} from 'react-icons/md';
import logo from '../assets/logo.jpeg';

const nav = [
  { to: '/', icon: MdDashboard, label: 'Dashboard' },
  { to: '/projects', icon: MdFolder, label: 'Projects' },
  { to: '/tasks', icon: MdCheckBox, label: 'Tasks' },
  { to: '/team', icon: MdGroup, label: 'Team' },
  { to: '/notifications', icon: MdNotifications, label: 'Notifications' },
  { to: '/settings', icon: MdSettings, label: 'Settings' },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-surface border-r border-surface-light z-30 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-light">
          <div className="flex items-center gap-2">
            <img src={logo} alt="WorkSync" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-white text-lg">WorkSync</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <MdClose size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-surface-light hover:text-white'}`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-surface-light">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">AJ</div>
            <div>
              <p className="text-white text-xs font-semibold">Alice Johnson</p>
              <p className="text-slate-500 text-xs">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
