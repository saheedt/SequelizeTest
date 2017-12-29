import userController from '../controllers/userController';
import baseController from '../controllers/baseController';

const Routes = (app) => {
  // user endpoints
  app.route('/api/v1/users/signin')
    .post();
  app.route('/api/v1/users/signup').post(userController.create);
};
export default Routes;
