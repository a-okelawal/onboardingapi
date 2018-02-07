export default class StringUtil {
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