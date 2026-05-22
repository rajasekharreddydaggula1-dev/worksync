import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { MdAdd, MdDelete, MdFlag } from 'react-icons/md';
import { createTask, deleteTask } from '../api';
import { addTask, removeTask } from '../store';

const priorityColor = { high: 'text-red-400', medium: 'text-yellow-400', low: 'text-green-400' };
const statusBg = { todo: 'bg-slate-700 text-slate-300', 'in-progress': 'bg-yellow-900/50 text-yellow-300', done: 'bg-green-900/50 text-green-300' };

export default function TasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', assignee: '', priority: 'medium', project: '', dueDate: '', status: 'todo' });

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    const { data } = await createTask(form);
    dispatch(addTask(data));
    setShowForm(false);
    setForm({ title: '', assignee: '', priority: 'medium', project: '', dueDate: '', status: 'todo' });
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    dispatch(removeTask(id));
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          <MdAdd size={18} /> Add Task
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'todo', 'in-progress', 'done'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-surface text-slate-400 hover:text-white border border-surface-light'}`}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="bg-surface border border-surface-light rounded-xl p-6 w-full max-w-md space-y-3">
            <h2 className="text-white font-semibold text-lg">New Task</h2>
            <input required placeholder="Task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
            <input placeholder="Assignee" value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })}
              className="w-full bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
            <input placeholder="Project" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}
              className="w-full bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                className="bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
              <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">Create</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-surface-light text-slate-300 py-2 rounded-lg text-sm hover:bg-slate-600 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface border border-surface-light rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs border-b border-surface-light bg-bg">
              <th className="text-left px-4 py-3 font-medium">Task</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Project</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Assignee</th>
              <th className="text-left px-4 py-3 font-medium">Priority</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Due</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-light/50">
            {filtered.map(task => (
              <tr key={task._id} className="hover:bg-surface-light/20 transition-colors">
                <td className="px-4 py-3 text-white font-medium text-xs">{task.title}</td>
                <td className="px-4 py-3 text-slate-400 text-xs hidden sm:table-cell">{task.project}</td>
                <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell">{task.assignee}</td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1 text-xs ${priorityColor[task.priority]}`}>
                    <MdFlag size={12} />{task.priority}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBg[task.status]}`}>{task.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">{task.dueDate}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(task._id)} className="text-slate-600 hover:text-red-400 transition-colors">
                    <MdDelete size={16} />
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
