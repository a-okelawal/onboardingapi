import StringUtil from '../shared/StringUtil';
import TokenUtil from '../shared/TokenUtil';
import User from '../models/User';

export default class EmployeeCtrl {
  static read(req, res) {
    User.find({})
      .select('name phone department email dOE role')
      .populate('department', 'name')
      .exec((err, users) => {
        if (err) {
          res.status(500).send({ error: err });
        } else {
          res.status(200).send(users);
        }
      });
  }

  static update(req, res) {
    const body = req.body;
    const id = req.params.id || req.body.id || req.query.id;

    User.findUserById(id).then((user) => {
      ['name', 'email', 'phone', 'department', 'role'].forEach((key) => {
        if (body[key]) {
          user[key] = body[key];
        }
      });

      user.save((err) => {
        if (err) {
          res.status(500).send({ error: err });
        } else {
          res.status(200).send(user);
        }
      });
    }).catch((err) => {
      res.status(err.code).send({ error: err.error });
    });
  }
}