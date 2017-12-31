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
   * @returns {Object} response object
   */
  static isAuthorized(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({
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
          req.loggedInUser = decoded;
          next();
        }
      }
    );
  }
  /**
   * @description Checks if Email Exists
   * @static
   * @param {object} req Client's request
   * @param {object} res Server Response
   * @param {object} user user details
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static emailExists(req, res, user) {
    if (user) {
      res.status(400).send({
        message: 'Email already exists',
      });
      return true;
    }
    return false;
  }
  /**
   * @description Checks if string is empty or null
   * @static
   * @param {object} str string for test
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static isEmptyOrNull(str) {
    return (!str || /^\s*$/.test(str));
  }
  /**
   * @description Checks if password is valid
   * @static
   * @param {object} req Client's request
   * @param {object} res Server Response
   * @param {object} password password
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static isPasswordValid(req, res, password) {
    if (baseController.isEmptyOrNull(password)) {
      res.status(400).send({
        message: 'password can not be empty or null'
      });
      return false;
    }
    if (password.length < 6) {
      res.status(400).send({
        message: 'password should be 6 or more characters long'
      });
      return false;
    }
    return true;
  }
}
