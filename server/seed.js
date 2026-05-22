require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./src/models/Task');
const User = require('./src/models/User');

const users = [
  { name: 'Alice Johnson', role: 'Frontend Dev', status: 'online' },
  { name: 'Bob Smith', role: 'Backend Dev', status: 'busy' },
  { name: 'Carol White', role: 'Designer', status: 'online' },
  { name: 'David Lee', role: 'DevOps', status: 'offline' }
];

const tasks = [
  { title: 'Design landing page', assignee: 'Carol White', status: 'done', priority: 'high' },
  { title: 'Setup CI/CD pipeline', assignee: 'David Lee', status: 'in-progress', priority: 'high' },
  { title: 'Build auth API', assignee: 'Bob Smith', status: 'in-progress', priority: 'medium' },
  { title: 'Implement dashboard UI', assignee: 'Alice Johnson', status: 'todo', priority: 'medium' },
  { title: 'Write unit tests', assignee: 'Bob Smith', status: 'todo', priority: 'low' },
  { title: 'Deploy to staging', assignee: 'David Lee', status: 'todo', priority: 'high' }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Task.deleteMany({});
  await User.deleteMany({});
  await User.insertMany(users);
  await Task.insertMany(tasks);
  console.log('✅ Seed data inserted!');
  process.exit(0);
});
