import userController from '../controllers/userController';

const Routes = (app) => {
  // user endpoints
  app.route('/api/v1/users/signin').post(userController.login);
  app.route('/api/v1/users/signup').post(userController.create);
};
export default Routes;
