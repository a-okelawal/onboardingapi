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
Task.createOne = function(body, id) {
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

Task.createMultiple = function(body, creatorId) {
  return new Promise((resolve, reject) => {
    var tasks = [];
    var aweek = new Date();
    aweek.setDate(aweek.getDate() + 7);

    body.onboardingList.forEach(element => {
      tasks.push(new Task({
        administrator: creatorId,
        assignee: body.assignee,
        task: element,
        due: body.due || aweek,
        creator: creatorId
      }));
    });

    Task.create(tasks, (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};

export default Task;