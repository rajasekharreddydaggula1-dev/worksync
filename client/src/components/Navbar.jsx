import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdMenu, MdSearch, MdNotifications, MdMessage, MdClose } from 'react-icons/md';
import { clearNotifications } from '../store';
import { markAllRead } from '../api';

export default function Navbar({ setOpen }) {
  const dispatch = useDispatch();
  const notifications = useSelector(s => s.notifications);
  const unread = notifications.filter(n => !n.read).length;
  const [showNotifs, setShowNotifs] = useState(false);
  const [search, setSearch] = useState('');

  const handleReadAll = async () => {
    await markAllRead();
    dispatch(clearNotifications());
    setShowNotifs(false);
  };

  return (
    <header className="h-16 bg-surface border-b border-surface-light flex items-center px-4 gap-4 sticky top-0 z-10">
      <button onClick={() => setOpen(o => !o)} className="lg:hidden text-slate-400 hover:text-white">
        <MdMenu size={24} />
      </button>

      <div className="flex-1 max-w-md relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search projects, tasks..."
          className="w-full bg-bg border border-surface-light rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-primary"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            <MdClose size={16} />
          </button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-surface-light rounded-lg transition-colors" onClick={() => setShowNotifs(s => !s)}>
          <MdNotifications size={22} />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{unread}</span>
          )}
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-surface-light rounded-lg transition-colors">
          <MdMessage size={22} />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-surface-light">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">AJ</div>
          <div className="hidden sm:block">
            <p className="text-white text-xs font-semibold">Alice Johnson</p>
            <p className="text-slate-500 text-xs">Admin</p>
          </div>
        </div>
      </div>

      {showNotifs && (
        <div className="absolute top-16 right-4 w-80 bg-surface border border-surface-light rounded-xl shadow-2xl z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-light">
            <span className="text-white font-semibold text-sm">Notifications</span>
            <button onClick={handleReadAll} className="text-primary text-xs hover:underline">Mark all read</button>
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {notifications.length === 0 && <li className="px-4 py-6 text-slate-500 text-sm text-center">No notifications</li>}
            {notifications.map((n, i) => (
              <li key={i} className={`px-4 py-3 border-b border-surface-light/50 flex gap-3 items-start ${!n.read ? 'bg-primary/5' : ''}`}>
                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.type === 'success' ? 'bg-green-400' : n.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                <div>
                  <p className="text-slate-300 text-xs">{n.message}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{new Date(n.time).toLocaleTimeString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
