import { useState } from 'react';
import socket from '../socket';

const Notifications = ({ notifications }) => {
  const [msg, setMsg] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    socket.emit('notification:send', { message: msg, type: 'info' });
    setMsg('');
  };

  return (
    <div className="notifications">
      <h2>🔔 Notifications</h2>
      <form onSubmit={send} className="notif-form">
        <input
          placeholder="Broadcast a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {notifications.map((n, i) => (
          <li key={i} className={`notif-item notif-${n.type}`}>
            <span>{n.message}</span>
            <small>{new Date(n.timestamp).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
