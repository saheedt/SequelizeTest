

const Routes = (app) => {
  // user endpoints
  app.route('/api/v1/users/signin').post();
  app.route('/api/v1/users/signup').post();
};
export default Routes;
