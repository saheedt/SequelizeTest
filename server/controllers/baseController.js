import jwt from 'jsonwebtoken';

/**
 * @description Contains all helper Functions
 * @export
 * @class baseController
 */

export default class baseController {
  /**
   * @description Checks if User exists
   * @static
   * @param {object} req Client's request
   * @param {object} res Server Response
   * @param {object} user User details
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static isUser(req, res, user) {
    if (!user) {
      if (req.url === '/api/v1/users/signin') {
        res.status(401).send({
          message: 'kindly sign up first'
        });
        return false;
      }
      res.status(404).send({
        message: 'user not found'
      });
      return false;
    }
    return true;
  }
  /**
   * @description jwt sign function
   * @param {string} id User Id
   * @param {string} email User Email
   * @returns {object} encoded token
   */
  static sign(id, email) {
    return jwt.sign(
      { id, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
  /**
   * @description Middleware to check authorization status
   * @param {Object} req client's request
   * @param {Object} res server response
   * @param {Function} next calls appropriate controller
   */
  static isAuthorized(req, res, next) {
    if (!req.headers.authorization) {
      res.status(500).send({
        message: 'unauthorized user'
      });
    }
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'invalid token' });
        }
        if (decoded) {
          next();
        }
      }
    );
  }
}
