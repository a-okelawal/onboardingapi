import bcrypt from 'bcrypt';

export default class StringUtil {
  /**
   * Compare Passwords
   * @param {*} password 
   * @param {*} hash 
   */
  static comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
  
  /**
   * Function to hash password
   * @param {*} password 
   */
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  /**
   * Test if email is valid
   * @param {*} email 
   */
  static isEmailValid(email) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
  }

  /**
   * Test if phone is valid
   * @param {*} phone 
   */
  static isPhoneValid(phone) {
    return /^0\d{10}/.test(phone);
  }
}