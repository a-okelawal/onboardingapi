export default class TokenUtil {
  /**
   * Generate signed token
   * @param {*} user 
   */
  static generateToken(user) {
    return jwt.sign({ id: user._id, name: user.name, role: user.role }, config.secret);
  }
}