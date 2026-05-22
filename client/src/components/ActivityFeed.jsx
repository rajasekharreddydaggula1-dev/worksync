const ActivityFeed = ({ activities }) => (
  <div className="activity-feed">
    <h2>⚡ Live Activity</h2>
    <ul>
      {activities.length === 0 && <li className="no-activity">No activity yet...</li>}
      {activities.map((a, i) => (
        <li key={i} className="activity-item">
          <span className="activity-msg">{a.message}</span>
          <span className="activity-time">
            {new Date(a.timestamp).toLocaleTimeString()}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityFeed;
