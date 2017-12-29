import { hash } from 'bcrypt';

import baseController from './baseController';

const { User } = require('../models');

const saltRounds = 10;

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
    * @returns {Function} User
    * @memberof userController
    */

  static create(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email,
        }
      })
      .then((user) => {
        if (!userController.emailExists(req, res, user)) {
          hash(req.body.password, saltRounds, (err, hashed) => {
            return User
              .create({
                email: req.body.email,
                password: hashed
              })
              .then((createdUser) => {
                delete createdUser.dataValues.password;
                delete createdUser.dataValues.updatedAt;
                delete createdUser.dataValues.createdAt;
                const token = userController.sign(
                  createdUser.dataValues.id,
                  createdUser.dataValues.email,
                );
                res.status(200).send({
                  message: 'sign up successful',
                  user: createdUser,
                  token
                });
              })
              .catch(ceatedUserError => res.status(500).send({
                message: 'error creating user',
                error: ceatedUserError.toString()
              }));
          });
        }
      })
      .catch(userError => res.status(500).send({
        message: 'unexpected error, try again',
        error: userError.toString()
      }));
  }
}
