import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAdd, MdDelete, MdFlag } from 'react-icons/md';
import { createTask, updateTask, deleteTask } from '../api';
import { addTask, updateTask as updateTaskStore, removeTask } from '../store';

const COLS = [
  { key: 'todo', label: 'To Do', color: 'border-slate-500', badge: 'bg-slate-700 text-slate-300' },
  { key: 'in-progress', label: 'In Progress', color: 'border-yellow-500', badge: 'bg-yellow-900/50 text-yellow-300' },
  { key: 'done', label: 'Done', color: 'border-green-500', badge: 'bg-green-900/50 text-green-300' },
];
const priorityColor = { high: 'text-red-400', medium: 'text-yellow-400', low: 'text-green-400' };

export default function KanbanPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks);
  const [adding, setAdding] = useState(null);
  const [form, setForm] = useState({ title: '', assignee: '', priority: 'medium', project: '', dueDate: '' });

  const handleAdd = async (status) => {
    if (!form.title) return;
    const { data } = await createTask({ ...form, status });
    dispatch(addTask(data));
    setAdding(null);
    setForm({ title: '', assignee: '', priority: 'medium', project: '', dueDate: '' });
  };

  const moveTask = async (task) => {
    const next = COLS[(COLS.findIndex(c => c.key === task.status) + 1) % COLS.length].key;
    const { data } = await updateTask(task._id, { status: next });
    dispatch(updateTaskStore(data));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    dispatch(removeTask(id));
  };

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Kanban Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className={`bg-surface border-t-2 ${col.color} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">{col.label}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${col.badge}`}>{colTasks.length}</span>
                </div>
                <button onClick={() => setAdding(col.key)} className="text-slate-400 hover:text-primary transition-colors">
                  <MdAdd size={20} />
                </button>
              </div>

              {adding === col.key && (
                <div className="bg-bg rounded-lg p-3 mb-3 space-y-2">
                  <input placeholder="Task title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-surface border border-surface-light rounded px-2 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
                  <input placeholder="Assignee" value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })}
                    className="w-full bg-surface border border-surface-light rounded px-2 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
                  <input placeholder="Project" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-surface border border-surface-light rounded px-2 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
                  <div className="flex gap-2">
                    <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                      className="flex-1 bg-surface border border-surface-light rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-primary">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
                      className="flex-1 bg-surface border border-surface-light rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAdd(col.key)} className="flex-1 bg-primary text-white text-xs py-1.5 rounded hover:bg-primary-dark transition-colors">Add</button>
                    <button onClick={() => setAdding(null)} className="flex-1 bg-surface-light text-slate-300 text-xs py-1.5 rounded hover:bg-slate-600 transition-colors">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-2 min-h-[100px]">
                {colTasks.map(task => (
                  <div key={task._id} className="bg-bg rounded-lg p-3 hover:border hover:border-primary/30 transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-white text-xs font-medium flex-1">{task.title}</p>
                      <button onClick={() => handleDelete(task._id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                        <MdDelete size={14} />
                      </button>
                    </div>
                    {task.project && <p className="text-slate-500 text-xs mt-1">{task.project}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <MdFlag size={12} className={priorityColor[task.priority]} />
                        <span className="text-slate-500 text-xs">{task.priority}</span>
                      </div>
                      {task.assignee && (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                          {task.assignee.charAt(0)}
                        </div>
                      )}
                    </div>
                    {task.dueDate && (
                      <p className="text-slate-500 text-xs mt-1">Due: {task.dueDate}</p>
                    )}
                    <button onClick={() => moveTask(task)} className="mt-2 w-full text-xs text-slate-500 hover:text-primary transition-colors text-left">
                      Move → {COLS[(COLS.findIndex(c => c.key === task.status) + 1) % COLS.length].label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
