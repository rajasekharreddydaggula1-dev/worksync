const STATUS_COLORS = { online: '#22c55e', offline: '#94a3b8', busy: '#f59e0b' };

const ActiveUsers = ({ users }) => (
  <div className="active-users">
    <h2>👥 Team Members</h2>
    <ul>
      {users.map((user, i) => (
        <li key={user._id || i} className="user-item">
          <div className="user-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <span
            className="status-dot"
            style={{ background: STATUS_COLORS[user.status] }}
            title={user.status}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default ActiveUsers;
