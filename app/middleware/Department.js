export default class Department {
  /**
   * Department creation validator
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static createValidator(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 3) {
      res.status(400).send({ error: 'Department name must be more than 2 characters.' });
    } else if (!body.onboardingList || body.onboardingList.length < 1) {
      res.status(400).send({ error: 'Department must have at least one todo in onboarding list.' });
    } else {
      next();
    }
  }

  /**
   * Department update validator
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static updateValidator(req, res, next) {
    const body = req.body;

    if ('name' in body && body.name.length < 3) {
      res.status(400).send({ error: 'Department name must be more than 2 characters.' });
    } else if ('onboardingList' in body && body.onboardingList.length < 1) {
      res.status(400).send({ error: 'Department must have at least one todo in onboarding list.' });
    } else {
      next();
    }
  }
}