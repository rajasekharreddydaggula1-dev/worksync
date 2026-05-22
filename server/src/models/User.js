const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Member' },
    status: { type: String, enum: ['online', 'offline', 'busy'], default: 'offline' },
    avatar: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
