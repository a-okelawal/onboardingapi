import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  administrator: {
    type: String,
    required: true,
    lowercase: true
  },
  assignee: {
    type: String,
    required: true,
    lowercase: true
  },
  creator: {
    type: String,
    required: true,
    lowercase: true
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
Task.createOne = function(body, name) {
  return new Promise((resolve, reject) => {
    const task = new Task({
      administrator: body.administrator,
      assignee: body.assignee,
      task: body.task,
      due: new Date(body.due),
      creator: name
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

Task.createMultiple = function(body, creator) {
  return new Promise((resolve, reject) => {
    var tasks = [];
    var aweek = new Date();
    aweek.setDate(aweek.getDate() + 7);

    body.onboardingList.forEach(element => {
      tasks.push(new Task({
        administrator: creator,
        assignee: body.assignee,
        task: element,
        due: body.due || aweek,
        creator: creator
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