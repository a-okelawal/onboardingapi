import Authorization from '../middleware/Authorization';
import Authentication from '../middleware/Authentication';
import EmployeeCtrl from '../controllers/EmployeeCtrl';

export default class EmployeeRoutes {
  /**
   * Handles all department routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/employee')
      .get(
        Authentication.authenticate,
        Authorization.isAdmin,
        EmployeeCtrl.read
      )
  }
}