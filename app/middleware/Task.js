import StringUtil from '../shared/StringUtil';

export default class TaskValidator {
  /**
   * Validate creation of a task
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static createValidator(req, res, next) {
    const body = req.body;

    if(!body.task || body.task.length < 10) {
      res.status(400).send({ error: 'Task must be at least 10 characters.' });
    } else if (!body.due || !StringUtil.isDateValid(body.due)) {
      res.status(400).send({ error: 'Task must have a due date. Format dd/mm/yyyy.' });
    } else {
      next();
    }
  }
}