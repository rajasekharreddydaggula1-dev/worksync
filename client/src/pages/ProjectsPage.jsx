import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAdd, MdFolder } from 'react-icons/md';
import { createProject } from '../api';
import { addProject } from '../store';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#14b8a6', '#ef4444'];

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const projects = useSelector(s => s.projects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', dueDate: '', color: '#6366f1' });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    const { data } = await createProject(form);
    dispatch(addProject(data));
    setShowForm(false);
    setForm({ name: '', dueDate: '', color: '#6366f1' });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          <MdAdd size={18} /> New Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="bg-surface border border-surface-light rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-white font-semibold text-lg">New Project</h2>
            <input required placeholder="Project name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
            <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
              className="w-full bg-bg border border-surface-light rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
            <div>
              <p className="text-slate-400 text-xs mb-2">Color</p>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                    className={`w-7 h-7 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-white' : ''}`}
                    style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">Create</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-surface-light text-slate-300 py-2 rounded-lg text-sm hover:bg-slate-600 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p._id} className="bg-surface border border-surface-light rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: p.color + '33' }}>
                  <MdFolder size={20} style={{ color: p.color }} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{p.name}</h3>
                  <p className="text-slate-500 text-xs">{p.tasks} tasks</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'completed' ? 'bg-green-900/50 text-green-300' : 'bg-blue-900/50 text-blue-300'}`}>
                {p.status}
              </span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span><span>{p.progress}%</span>
              </div>
              <div className="bg-bg rounded-full h-2">
                <div className="h-2 rounded-full transition-all" style={{ width: `${p.progress}%`, background: p.color }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {(p.members || []).slice(0, 3).map((m, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold border-2 border-surface">
                    {m.charAt(0)}
                  </div>
                ))}
              </div>
              {p.dueDate && <p className="text-slate-500 text-xs">Due {p.dueDate}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
