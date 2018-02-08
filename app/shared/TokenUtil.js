import jwt from 'jsonwebtoken';

import config from '../../config/config';

export default class TokenUtil {
  /**
   * Generate signed token
   * @param {*} user 
   */
  static generateToken(user) {
    return jwt.sign({ id: user._id, name: user.name, role: user.role }, config.secret);
  }

  /**
   * Verify token
   * @param {String} token 
   */
  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          reject({ code: 401, error: 'Invalid token.' });
        } else {
          resolve(decoded);
        }
      });
    });
  }
}