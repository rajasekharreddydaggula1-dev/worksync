require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const initSocket = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
});

app.use(cors());
app.use(express.json());
app.set('io', io);

// ── In-Memory Data ──────────────────────────────────────────────
let projects = [
  { _id: 'p1', name: 'WorkSync Platform', progress: 72, tasks: 24, dueDate: '2025-08-15', status: 'active', members: ['Alice Johnson', 'Bob Smith', 'Carol White'], color: '#6366f1' },
  { _id: 'p2', name: 'Mobile App Redesign', progress: 45, tasks: 18, dueDate: '2025-07-30', status: 'active', members: ['Carol White', 'David Lee'], color: '#22c55e' },
  { _id: 'p3', name: 'API Gateway Migration', progress: 90, tasks: 12, dueDate: '2025-07-10', status: 'active', members: ['Bob Smith', 'David Lee'], color: '#f59e0b' },
  { _id: 'p4', name: 'Analytics Dashboard', progress: 30, tasks: 20, dueDate: '2025-09-01', status: 'active', members: ['Alice Johnson', 'Eve Martinez'], color: '#ec4899' },
  { _id: 'p5', name: 'Auth Service Upgrade', progress: 100, tasks: 8, dueDate: '2025-06-20', status: 'completed', members: ['Bob Smith'], color: '#14b8a6' },
];

let tasks = [
  { _id: 't1', title: 'Design system components', project: 'WorkSync Platform', assignee: 'Carol White', status: 'done', priority: 'high', dueDate: '2025-07-05', createdAt: new Date() },
  { _id: 't2', title: 'Setup CI/CD pipeline', project: 'API Gateway Migration', assignee: 'David Lee', status: 'in-progress', priority: 'high', dueDate: '2025-07-08', createdAt: new Date() },
  { _id: 't3', title: 'Build REST endpoints', project: 'WorkSync Platform', assignee: 'Bob Smith', status: 'in-progress', priority: 'medium', dueDate: '2025-07-12', createdAt: new Date() },
  { _id: 't4', title: 'Implement dashboard UI', project: 'Analytics Dashboard', assignee: 'Alice Johnson', status: 'todo', priority: 'medium', dueDate: '2025-07-20', createdAt: new Date() },
  { _id: 't5', title: 'Write unit tests', project: 'WorkSync Platform', assignee: 'Bob Smith', status: 'todo', priority: 'low', dueDate: '2025-07-25', createdAt: new Date() },
  { _id: 't6', title: 'Mobile navigation redesign', project: 'Mobile App Redesign', assignee: 'Carol White', status: 'in-progress', priority: 'high', dueDate: '2025-07-15', createdAt: new Date() },
  { _id: 't7', title: 'Performance optimization', project: 'API Gateway Migration', assignee: 'David Lee', status: 'done', priority: 'high', dueDate: '2025-07-03', createdAt: new Date() },
  { _id: 't8', title: 'User onboarding flow', project: 'Mobile App Redesign', assignee: 'Eve Martinez', status: 'todo', priority: 'medium', dueDate: '2025-07-28', createdAt: new Date() },
];

let users = [
  { _id: 'u1', name: 'Alice Johnson', role: 'Frontend Dev', status: 'online', avatar: 'AJ', tasksCompleted: 12 },
  { _id: 'u2', name: 'Bob Smith', role: 'Backend Dev', status: 'busy', avatar: 'BS', tasksCompleted: 18 },
  { _id: 'u3', name: 'Carol White', role: 'UI Designer', status: 'online', avatar: 'CW', tasksCompleted: 9 },
  { _id: 'u4', name: 'David Lee', role: 'DevOps', status: 'offline', avatar: 'DL', tasksCompleted: 15 },
  { _id: 'u5', name: 'Eve Martinez', role: 'QA Engineer', status: 'online', avatar: 'EM', tasksCompleted: 7 },
];

let activities = [
  { _id: 'a1', user: 'Bob Smith', action: 'completed task', target: 'Performance optimization', time: new Date(Date.now() - 5 * 60000).toISOString(), type: 'complete' },
  { _id: 'a2', user: 'Carol White', action: 'updated', target: 'Design system components', time: new Date(Date.now() - 15 * 60000).toISOString(), type: 'update' },
  { _id: 'a3', user: 'Alice Johnson', action: 'created task', target: 'User onboarding flow', time: new Date(Date.now() - 30 * 60000).toISOString(), type: 'create' },
  { _id: 'a4', user: 'David Lee', action: 'moved to in-progress', target: 'Setup CI/CD pipeline', time: new Date(Date.now() - 60 * 60000).toISOString(), type: 'update' },
  { _id: 'a5', user: 'Eve Martinez', action: 'commented on', target: 'Mobile navigation redesign', time: new Date(Date.now() - 90 * 60000).toISOString(), type: 'comment' },
];

let notifications = [
  { _id: 'n1', message: 'API Gateway Migration is 90% complete!', type: 'success', read: false, time: new Date().toISOString() },
  { _id: 'n2', message: 'Task "Write unit tests" is overdue', type: 'warning', read: false, time: new Date().toISOString() },
  { _id: 'n3', message: 'Carol White joined Mobile App Redesign', type: 'info', read: true, time: new Date().toISOString() },
];

const weeklyData = [
  { day: 'Mon', completed: 4, inProgress: 6, pending: 3 },
  { day: 'Tue', completed: 6, inProgress: 5, pending: 4 },
  { day: 'Wed', completed: 5, inProgress: 8, pending: 2 },
  { day: 'Thu', completed: 8, inProgress: 4, pending: 5 },
  { day: 'Fri', completed: 7, inProgress: 6, pending: 3 },
  { day: 'Sat', completed: 3, inProgress: 2, pending: 1 },
  { day: 'Sun', completed: 2, inProgress: 1, pending: 2 },
];

let idCounter = 100;
const newId = () => String(idCounter++);

// ── Project Routes ───────────────────────────────────────────────
app.get('/api/projects', (_, res) => res.json(projects));
app.post('/api/projects', (req, res) => {
  const p = { _id: newId(), progress: 0, tasks: 0, status: 'active', members: [], color: '#6366f1', ...req.body };
  projects.unshift(p);
  io.emit('project:created', p);
  res.status(201).json(p);
});
app.patch('/api/projects/:id', (req, res) => {
  const p = projects.find(p => p._id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  Object.assign(p, req.body);
  io.emit('project:updated', p);
  res.json(p);
});

// ── Task Routes ──────────────────────────────────────────────────
app.get('/api/tasks', (_, res) => res.json(tasks));
app.post('/api/tasks', (req, res) => {
  const task = { _id: newId(), status: 'todo', createdAt: new Date(), ...req.body };
  tasks.unshift(task);
  const act = { _id: newId(), user: task.assignee || 'Someone', action: 'created task', target: task.title, time: new Date().toISOString(), type: 'create' };
  activities.unshift(act);
  io.emit('task:created', task);
  io.emit('activity:new', act);
  res.status(201).json(task);
});
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t._id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  Object.assign(task, req.body);
  const act = { _id: newId(), user: task.assignee || 'Someone', action: `moved to ${task.status}`, target: task.title, time: new Date().toISOString(), type: 'update' };
  activities.unshift(act);
  io.emit('task:updated', task);
  io.emit('activity:new', act);
  res.json(task);
});
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t._id !== req.params.id);
  io.emit('task:deleted', req.params.id);
  res.json({ message: 'Deleted' });
});

// ── User Routes ──────────────────────────────────────────────────
app.get('/api/users', (_, res) => res.json(users));
app.patch('/api/users/:id/status', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  user.status = req.body.status;
  io.emit('user:statusChanged', user);
  res.json(user);
});

// ── Analytics Routes ─────────────────────────────────────────────
app.get('/api/analytics', (_, res) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length;
  res.json({ totalProjects: projects.length, totalTasks: total, completedTasks: done, inProgressTasks: inProgress, todoTasks: todo, overdueTasks: overdue, weeklyData });
});

// ── Activity Routes ──────────────────────────────────────────────
app.get('/api/activities', (_, res) => res.json(activities.slice(0, 15)));

// ── Notification Routes ──────────────────────────────────────────
app.get('/api/notifications', (_, res) => res.json(notifications));
app.patch('/api/notifications/read-all', (_, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json(notifications);
});

initSocket(io);

server.listen(process.env.PORT || 5000, () => {
  console.log(`✅ WorkSync Server running on http://localhost:${process.env.PORT || 5000}`);
});
