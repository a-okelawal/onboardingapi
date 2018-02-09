import Authorization from '../middleware/Authorization';
import Authentication from '../middleware/Authentication';
import Employee from '../middleware/Employee';
import EmployeeCtrl from '../controllers/EmployeeCtrl';

export default class EmployeeRoutes {
  /**
   * Handles all department routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/employees')
      .get(
        Authentication.authenticate,
        Authorization.isAdmin,
        EmployeeCtrl.read
      );

    router.route('/employees/:id')
      .put(
        Authentication.authenticate,
        Authorization.isAdmin,
        Employee.updateValidator,
        EmployeeCtrl.update
      );
  }
}