import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    default: 'Guest User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);
