import baseController from './baseController';

const { Review } = require('../models');

/**
 * @description Contains all Review Related Functions
 * @export
 * @class reviewController
 */
export default class reviewController extends baseController {
  /**
    * @description Allows Users review recipe
    * @static
    * @param {object} req Client's request
    * @param {object} res Server Response
    * @returns {Object} Review
    * @memberof reviewController
    */
  static create(req, res) {
    return Review
      .create({
        entry: req.body.entry,
        by: req.loggedInUser.email,
        recipeId: parseInt(req.params.recipeId, 10),
        userId: parseInt(req.loggedInUser.id, 10)
      })
      .then(review => res.status(200).send({
        message: 'recipe review added successfully',
        review
      }))
      .catch(error => res.status(500).send({
        message: 'unexpected error occured',
        error: error.toString()
      }));
  }
}
