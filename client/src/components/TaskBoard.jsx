import { useState } from 'react';
import { createTask, updateTask, deleteTask } from '../api';

const STATUSES = ['todo', 'in-progress', 'done'];
const PRIORITIES = ['low', 'medium', 'high'];

const TaskBoard = ({ tasks, setTasks }) => {
  const [form, setForm] = useState({ title: '', assignee: '', priority: 'medium' });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.assignee) return;
    const { data } = await createTask(form);
    setTasks((prev) => [data, ...prev]);
    setForm({ title: '', assignee: '', priority: 'medium' });
  };

  const handleStatus = async (task) => {
    const next = STATUSES[(STATUSES.indexOf(task.status) + 1) % STATUSES.length];
    const { data } = await updateTask(task._id, { status: next });
    setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="task-board">
      <h2>📋 Tasks</h2>
      <form className="task-form" onSubmit={handleAdd}>
        <input
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Assignee"
          value={form.assignee}
          onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="task-columns">
        {STATUSES.map((status) => (
          <div key={status} className="task-column">
            <h3 className={`column-header ${status}`}>{status.toUpperCase()}</h3>
            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <div key={task._id} className={`task-card priority-${task.priority}`}>
                  <p className="task-title">{task.title}</p>
                  <span className="task-assignee">👤 {task.assignee}</span>
                  <div className="task-actions">
                    <button onClick={() => handleStatus(task)} title="Next status">→</button>
                    <button onClick={() => handleDelete(task._id)} title="Delete" className="delete-btn">✕</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
