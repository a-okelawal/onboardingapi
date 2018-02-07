export default class TaskValidator {
  /**
   * Validate creation of a task
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static createValidator(req, res, next) {
    const body = req.body;
    console.log('Create Validator');

    if(!body.task || body.task.length < 10) {
      res.status(400).send({ error: 'Task must be at least 10 characters.' });
    } else if (!body.due || !TaskValidator.isDateValid(body.due)) {
      res.status(400).send({ error: 'Task must have a due date. Format dd/mm/yyyy.' });
    } else {
      next();
    }
  }

  /**
   * Check if date is valid
   * @param {*} date 
   */
  static isDateValid(date) {
    return /^\d{1,2}\/\d{1,2}\/(?:\d{2}|\d{4})$/.test(date);
  }
}