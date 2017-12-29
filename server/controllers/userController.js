import baseController from './baseController';
import User from '../models/user';
/**
 * @description Contains all Users Related Functions
 * @export
 * @class userController
 */
export default class userController extends baseController {
  /**
    * @description Allows Users to signup
    * @static
    * @param {object} req Client's request
    * @param {object} res Server Response
    * @memberof userController
    */
  static create(req, res) {
    res.send(req.body.email);
  }
}
