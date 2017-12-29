import userController from '../controllers/userController';
import recipeController from '../controllers/recipeController';

const Routes = (app) => {
  // user endpoints
  app.route('/api/v1/users/signin').post(userController.login);
  app.route('/api/v1/users/signup').post(userController.create);

  // recipe endpoints
  app.route('/api/v1/recipes')
    .post(recipeController.isAuthorized, recipeController.create);
  app.route('/api/v1/recipes/:recipeId')
    .put(recipeController.isAuthorized, recipeController.update);
  app.route('/api/v1/recipes/:recipeId')
    .delete(recipeController.isAuthorized, recipeController.destroy);
  app.route('/api/v1/recipes')
    .get(recipeController.isAuthorized, recipeController.list);
};
export default Routes;
