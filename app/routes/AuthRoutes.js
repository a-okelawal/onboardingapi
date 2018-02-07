import AuthenticationCtrl from '../controllers/AuthenticationCtrl';
import Authentication from '../middleware/Authentication';
import Authorization from '../middleware/Authorization';

export default class AuthRoutes {
  /**
   * All Auth routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/auth/signup')
      .post(
        Authentication.signupValidator,
        Authentication.authenticate,
        Authorization.isAdmin,
        AuthenticationCtrl.signup
      );

    router.route('/auth/login')
      .post(
        AuthenticationCtrl.login
      );

    router.route('/auth/forgot-password')
      .post(
        Authentication.forgotPasswordValidator,
        AuthenticationCtrl.forgotPassword
      )
  }
};