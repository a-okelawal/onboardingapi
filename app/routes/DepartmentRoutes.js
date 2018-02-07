import Authorization from '../middleware/Authorization';
import DepartmentCtrl from '../controllers/DepartmentCtrl';
import DepartmentValidator from '../middleware/Department';
import Authentication from '../middleware/Authentication';

export default class DepartmentRoutes {
  /**
   * Handles all department routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/dept')
      .post(
        Authentication.authenticate,
        Authorization.isAdmin,
        DepartmentValidator.createValidator,
        DepartmentCtrl.create
      )
      .get(
        Authentication.authenticate,
        Authorization.isEmployee,
        DepartmentCtrl.read
      );

    router.route('/dept/:id')
      .put(
        Authentication.authenticate,
        Authorization.isAdmin,
        DepartmentValidator.updateValidator,
        DepartmentCtrl.update
      );
  }
}