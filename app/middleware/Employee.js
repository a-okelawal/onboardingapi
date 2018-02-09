import Department from '../models/Department';
import StringUtil from '../shared/StringUtil';

export default class Employee {
  /**
   * Validate user update request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static updateValidator(req, res, next) {
    const body = req.body;

    if ('name' in body && (body.name.length < 7 || (body.name.split(' ')).length < 2)) {
      res.status(400).send({ error: 'Name must have atleast first and last name.' });
    } else if ('email' in body && !StringUtil.isEmailValid(body.email)) {
      res.status(400).send({ error: 'Email is invalid.' });
    } else if ('phone' in body && !StringUtil.isPhoneValid(body.phone)) {
      res.status(400).send({ error: 'Phone number is invalid.' });
    } else if ('role' in body && (body.role !== 'super' && body.role !== 'admin' && body.role !== 'employee')) {
      res.status(400).send({ error: 'Role is invalid.' });
    } else if ('department' in body) {
      Department.findDeptById(body.department)
        .then((department) => {
          req.body.department = department._id;
          next();
        })
        .catch((err) => {
          res.status(400).send({ error: 'Department invalid.' });
        });
    } else {
      next();
    }
  }
}