import userController from '../controllers/userController';

const Routes = (app) => {
  // user endpoints
  app.route('/api/v1/users/signin').post(userController.login);
  app.route('/api/v1/users/signup').post(userController.create);

  // recipe endpoints
  app.route('/api/v1/recipes').post();
  app.route('/api/v1/recipes/:recipeId').put();
  app.route('/api/v1/recipes/:recipeId').delete();
  app.route('/api/v1/recipes').get();
};
export default Routes;
