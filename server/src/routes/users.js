const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  req.app.get('io')?.emit('user:joined', user);
  res.status(201).json(user);
});

router.patch('/:id/status', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  req.app.get('io')?.emit('user:statusChanged', user);
  res.json(user);
});

module.exports = router;
