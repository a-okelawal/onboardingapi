import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  administrator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['awaiting-start', 'in-progress', 'in-review', 'complete'],
    default: 'awaiting-start',
    required: true
  },
  due: {
    type: Date,
    required: true
  },
  comments: [{
    type: String
  }]
});

export default mongoose.model('Task', taskSchema);