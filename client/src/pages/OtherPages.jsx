import { useSelector, useDispatch } from 'react-redux';
import { markAllRead } from '../api';
import { clearNotifications } from '../store';

export function NotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector(s => s.notifications);
  const typeColor = { success: 'border-green-500 bg-green-900/10', warning: 'border-yellow-500 bg-yellow-900/10', info: 'border-blue-500 bg-blue-900/10' };

  const handleReadAll = async () => {
    await markAllRead();
    dispatch(clearNotifications());
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        {notifications.length > 0 && (
          <button onClick={handleReadAll} className="text-primary text-sm hover:underline">Mark all as read</button>
        )}
      </div>
      <div className="space-y-3 max-w-2xl">
        {notifications.length === 0 && (
          <div className="bg-surface border border-surface-light rounded-xl p-8 text-center text-slate-500">No notifications</div>
        )}
        {notifications.map((n, i) => (
          <div key={i} className={`border-l-4 rounded-xl p-4 ${typeColor[n.type] || 'border-slate-500 bg-slate-900/10'}`}>
            <p className="text-white text-sm">{n.message}</p>
            <p className="text-slate-500 text-xs mt-1">{new Date(n.time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarPage() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Calendar</h1>
      <div className="bg-surface border border-surface-light rounded-xl p-8 text-center text-slate-500">
        Calendar view coming soon
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-surface border border-surface-light rounded-xl p-8 text-center text-slate-500">
        Settings panel coming soon
      </div>
    </div>
  );
}
