import StringUtil from '../shared/StringUtil';
import TokenUtil from '../shared/TokenUtil';
import User from '../models/User';

export default class EmployeeCtrl {
  static read(req, res) {
    User.find({})
      .select('name role')
      .exec((err, users) => {
        if (err) {
          res.status(500).send({ error: err });
        } else {
          res.status(200).send(users);
        }
      });
  }
}