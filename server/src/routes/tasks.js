const router = require('express').Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  req.app.get('io')?.emit('task:created', task);
  res.status(201).json(task);
});

router.patch('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  req.app.get('io')?.emit('task:updated', task);
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.app.get('io')?.emit('task:deleted', req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
