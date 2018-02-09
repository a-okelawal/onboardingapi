import Task from '../models/Task';

export default class TaskController {
  /**
   * Logic for creating a task
   */
  static create(req, res) {
    const body = req.body;

    Task.createOne(body, req.user.name)
      .then((task) => {
        res.status(201).send({ message: 'Task created successfully.' });
      })
      .catch((err) => {
        res.status(err.code).send({ error: err.error });
      });
  }

  /**
   * Read tasks
   * @param {*} req 
   * @param {*} res 
   */
  static read(req, res) {
    let query = {};

    const page = req.body.page || req.query.page || 0;
    const limit = req.body.limit || req.query.limit || 10;
    const status = req.body.status || req.query.status;
    const term = req.body.query || req.query.query;
    const begin = req.body.begin || req.query.begin;
    const end = req.body.end || req.query.end;
    
    if (term) {
      query['$and'] = [{
        $or: [
          {
            'administrator': {
              $regex: term,
              $options: 'i'
            }
          },
          {
            'assignee': {
              $regex: term,
              $options: 'i'
            }
          },
          {
            'creator': {
              $regex: term,
              $options: 'i'
            }
          },
          {
            'task': {
              $regex: term,
              $options: 'i'
            }
          },
          {
            'status': {
              $regex: term,
              $options: 'i'
            }
          }
        ]
      }];
    }

    if (begin && end) {
      query['$and'] = [
        {
          'due': {
            $gte: new Date(begin)
          }
        },
        {
          'due': {
            $lte: new Date(end)
          }
        }
      ]
    }

    Task.find(query)
    .limit(limit)
    .skip(limit * page)
    .exec((err, tasks) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err });
      } else {
        res.status(200).send(tasks);
      }
    });
  }
}