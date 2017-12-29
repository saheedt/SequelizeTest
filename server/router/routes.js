import userController from '../controllers/userController';
import baseController from '../controllers/baseController';

const Routes = (app) => {
  // user endpoints
  app.route('/api/v1/users/signin')
    .post(baseController.isAuthorized, userController.create);
  app.route('/api/v1/users/signup').post();
};
export default Routes;
