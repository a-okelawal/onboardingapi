import AuthRoutes from './AuthRoutes';
import DepartmentRoutes from './DepartmentRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import TaskRoutes from './TaskRoutes';

export default class Routes {
  /**
   * Register routes
   * @param {*} router 
   */
  static routes(router) {
    AuthRoutes.routes(router);
    DepartmentRoutes.routes(router);
    EmployeeRoutes.routes(router);
    TaskRoutes.routes(router);
  }
};