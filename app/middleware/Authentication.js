import jwt from 'jsonwebtoken';

import config from '../../config/config';
import StringUtil from '../shared/StringUtil';
import TokenUtil from '../shared/TokenUtil';

export default class Authentication {
  /**
   * Validate user signup request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static signupValidator(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 7 || (body.name.split(' ')).length < 2) {
      res.status(400).send({ error: 'Name must have atleast first and last name.' });
    } else if (!body.email || !StringUtil.isEmailValid(body.email)) {
      res.status(400).send({ error: 'Email is invalid.' });
    } else if (!body.password || body.password.length < 6) {
      res.status(400).send({ error: 'Password is invalid. Must be at least 6 characters.' });
    } else if (!body.department) {
      res.status(400).send({ error: 'Employee must belong to a department.' });
    } else if ('phone' in body && !StringUtil.isPhoneValid(body.phone)) {
      res.status(400).send({ error: 'Phone number is invalid.' });
    } else if (!body.secret || body.secret.length < 6) {
      res.status(400).send({ error: 'Secret is invalid.' });
    } else {
      next();
    }
  }

  /**
   * Auuthenticate User
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];

    TokenUtil.verify(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        res.status(err.code).send({ error: err.error });
      });
  }

  /**
   * Validate forgot password data
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static forgotPasswordValidator(req, res, next) {
    const body = req.body;

    if (!StringUtil.isEmailValid(body.email)) {
      res.status(400).send({ error: 'Invalid email address.' });
    } else if (body.password.length < 6) {
      res.status(400).send({ error: 'Invalid Password.' });
    } else {
      next();
    }
  }
}