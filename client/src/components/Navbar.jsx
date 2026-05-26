import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdMenu, MdSearch, MdNotifications, MdMessage, MdClose, MdKeyboardArrowDown } from 'react-icons/md';
import { clearNotifications } from '../store';
import { markAllRead } from '../api';

const weeks = ['This Week', 'Last Week', 'This Month', 'Last Month'];

export default function Navbar({ setOpen }) {
  const dispatch = useDispatch();
  const notifications = useSelector(s => s.notifications);
  const unread = notifications.filter(n => !n.read).length;
  const [showNotifs, setShowNotifs] = useState(false);
  const [search, setSearch] = useState('');
  const [week, setWeek] = useState('This Week');
  const [showWeek, setShowWeek] = useState(false);

  const handleReadAll = async () => {
    await markAllRead();
    dispatch(clearNotifications());
    setShowNotifs(false);
  };

  return (
    <header className="h-[70px] bg-white border-b border-slate-100 flex items-center px-6 gap-4 sticky top-0 z-10 shadow-sm">
      <button onClick={() => setOpen(o => !o)} className="lg:hidden text-slate-400 hover:text-slate-700 mr-1">
        <MdMenu size={24} />
      </button>

      {/* Title */}
      <div className="hidden lg:block">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-400 text-xs">Welcome back, Kamal Raja! 👋</p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-auto relative">
        <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search projects, tasks, people…"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <MdClose size={16} />
          </button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Week selector */}
        <div className="relative hidden sm:block">
          <button onClick={() => setShowWeek(s => !s)}
            className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 hover:border-blue-300 transition-all">
            {week}
            <MdKeyboardArrowDown size={16} className={`transition-transform ${showWeek ? 'rotate-180' : ''}`} />
          </button>
          {showWeek && (
            <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-36 z-50">
              {weeks.map(w => (
                <button key={w} onClick={() => { setWeek(w); setShowWeek(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${week === w ? 'text-blue-600 font-medium' : 'text-slate-600'}`}>
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification */}
        <div className="relative">
          <button onClick={() => setShowNotifs(s => !s)}
            className="relative w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:border-blue-300 hover:text-blue-500 transition-all">
            <MdNotifications size={20} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <span className="text-slate-800 font-semibold text-sm">Notifications</span>
                <button onClick={handleReadAll} className="text-blue-500 text-xs font-medium hover:underline">Mark all read</button>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.length === 0 && <li className="px-4 py-6 text-slate-400 text-sm text-center">All caught up! 🎉</li>}
                {notifications.map((n, i) => (
                  <li key={i} className={`px-4 py-3 flex gap-3 items-start hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
                    <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.type === 'success' ? 'bg-green-400' : n.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                    <div className="flex-1">
                      <p className="text-slate-700 text-xs leading-relaxed">{n.message}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{new Date(n.time).toLocaleTimeString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Message */}
        <button className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:border-blue-300 hover:text-blue-500 transition-all">
          <MdMessage size={20} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">KR</div>
          <div className="hidden sm:block">
            <p className="text-slate-800 text-xs font-semibold leading-tight">Kamal Raja</p>
            <p className="text-slate-400 text-[10px]">Project Manager</p>
          </div>
          <MdKeyboardArrowDown size={16} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
