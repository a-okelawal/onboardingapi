import Authentication from '../middleware/Authentication';
import Authorization from '../middleware/Authorization';
import TaskController from '../controllers/TaskCtrl';
import TaskValidator from '../middleware/Task';

export default class TaskRoutes {
  static routes(router) {
    router.route('/tasks')
      .post(
        Authentication.authenticate,
        Authorization.isAdmin,
        TaskValidator.createValidator,
        TaskController.create
      )
      .get(
        Authentication.authenticate,
        Authorization.isAdmin,
        TaskController.read
      );
  }
}