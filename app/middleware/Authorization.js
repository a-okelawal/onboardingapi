import config from '../../config/config';

export default class Authorization {
  /**
   * Authorization check for super admins
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static isSuperAdmin(req, res, next) {
    const user = req.user;

    if (user.role !== 'super') {
      res.status(401).send({ error: 'Unauthorized.' })
    } else {
      next();
    }
  }

  /**
   * Authorization check for admins
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static isAdmin(req, res, next) {
    const user = req.user;

    if (user.role !== 'super' && user.role !== 'admin') {
      res.status(401).send({ error: 'Unauthorized.' })
    } else {
      next();
    }
  }

  /**
   * Authorization for Employees
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static isEmployee(req, res, next) {
    const user = req.user;

    if (user.role !== 'super' && user.role !== 'admin' && user.role !== 'employee') {
      res.status(401).send({error: 'Unauthorized.'})
    } else {
      next();
    }
  }
}