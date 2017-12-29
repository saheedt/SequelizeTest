import { hash, compare } from 'bcrypt';

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
                res.loggedInUser = {
                  id: createdUser.dataValues.id,
                  email: createdUser.dataValues.email
                };
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

  /**
   * @description Allows registered users sign in
   * @static
   * @param {object} req Client's request
   * @param {object} res Server Response
   * @returns {Function} User
   * @memberof userController
   */

  static login(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email
        },
        attributes: {
          excludes: ['createdAt', 'updatedAt']
        }
      })
      .then((user) => {
        if (userController.isUser(req, res, user)) {
          compare(req.body.password, user.dataValues.password, (err, resp) => {
            if (!resp || err) {
              return res.status(400).send({
                message: 'wrong email or password'
              });
            }
            const token = userController.sign(
              user.dataValues.id,
              user.dataValues.email
            );
            delete user.dataValues.password;
            delete user.dataValues.updatedAt;
            delete user.dataValues.createdAt;
            res.loggedInUser = {
              id: user.dataValues.id,
              email: user.dataValues.email
            };
            return res.status(200).send({
              message: 'sign in successful',
              token
            });
          });
        }
      })
      .catch(error => res.status(500).send({
        message: 'unexpected error, try again',
        error: error.toString()
      }));
  }
}
