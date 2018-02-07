import Task from '../models/Task';

export default class TaskController {
  /**
   * Logic for creating a task
   */
  static create(req, res) {
    const body = req.body;

    Task.create({
      administrator: body.administrator,
      assignee: body.assignee,
      task: body.task,
      due: new Date(body.due),
      creator: req.user.id
    }, (err, task) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(201).send({ message: 'Task created successfully.' });
      }
    });
  }

  static read(req, res) {
    let query = {};

    const page = req.body.page || req.query.page || 0;
    const limit = req.body.limit || req.query.limit || 10;
    const status = req.body.status || req.query.status;

    if (status) {
      query['status'] = status;
    }

    Task.find(query)
    .limit(limit)
    .skip(limit * page)
    .exec((err, tasks) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send(tasks);
      }
    });
  }
}