
import baseController from '../controllers/baseController';

const { User, Recipe } = require('../models');

/**
 * @description Contains all Recipe Related Functions
 * @export
 * @class recipeController
 */
export default class recipeController extends baseController {
  /**
    * @description Allows users to create recipe
    * @static
    * @param {object} req Client's request
    * @param {object} res Server Response
    * @returns {Object} Recipe
    * @memberof recipeController
    */
  static create(req, res) {
    return Recipe
      .create({
        name: req.body.name,
        content: req.body.content,
        userId: req.loggedInUser.id
      })
      .then(recipe => res.status(200).send({
        message: 'recipe successfully created', recipe
      }))
      .catch(recipeError => res.status(500).send({
        message: 'error creating recipe',
        error: recipeError.toString()
      }));
  }
  /**
    * @description Allow authorized user List all recipe
    * @static
    * @param {object} req Client's request
    * @param {object} res Server Response
    * @returns {Object} Recipe
    * @memberof recipeController
    */
  static list(req, res) {
    return Recipe
      .findAll({
        include: [{
          model: User,
          attributes: ['id', 'email']
        }]
      }).then(recipes => res.status(200).send({
        message: 'success',
        recipes
      }))
      .catch(error => res.status(500).send({
        message: 'error getting recipes',
        error: error.toString()
      }));
  }
  /**
    * @description Allows authorized user update own recipe
    * @static
    * @param {object} req Client's request
    * @param {object} res Server Response
    * @returns {object} Recipe
    * @memberof recipeController
   */
  static update(req, res) {
    return Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        },
        include: [{
          model: User,
          attributes: ['id', 'email']
        }]
      }).then((recipes) => {
        if (recipes.dataValues.userId === req.loggedInUser.id) {
          return recipes
            .update({
              name: req.body.name || recipes.dataValues.name,
              content: req.body.content || recipes.dataValues.content
            })
            .then((updateRecipe) => {
              res.status(200).send({
                message: 'recipe update successful',
                recipe: updateRecipe
              });
            })
            .catch(updateRecipeError => res.status(500).send({
              message: 'error updating recipe',
              error: updateRecipeError.toString()
            }));
        }
      })
      .catch(error => res.status(500).send({
        message: 'error getting recipes',
        error: error.toString()
      }));
  }
}
