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

const Task = mongoose.model('Task', taskSchema);

/**
 * Create new Task
 * Note: es6 does not work with mongoose model
 * @param {*} body 
 */
Task.create = function(body, id) {
  return new Promise((resolve, reject) => {
    const task = new Task({
      administrator: body.administrator,
      assignee: body.assignee,
      task: body.task,
      due: new Date(body.due),
      creator: id
    });
    
    task.save((err) => {
      if (err) {
        reject({code: 500, error: err });
      } else {
        resolve(task);
      }
    });
  });
};

export default Task;