
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
      .then((recipe) => {
        if (!recipe) {
          return res.status(500).send({
            status: 'Fail',
            message: 'error creating recipe'
          });
        }
        res.status(200).send({
          status: 'Success',
          message: 'recipe successfully created',
          data: recipe
        });
      })
      .catch(recipeError => res.status(500).send({
        status: 'Fail',
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
      }).then((recipes) => {
        if (!recipes) {
          return res.status(400).send({
            status: 'Fail',
            message: 'no recipe recorded yet'
          });
        }
        res.status(200).send({
          status: 'Success',
          message: 'recipe list',
          data: recipes
        });
      })
      .catch(error => res.status(500).send({
        status: 'Fail',
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
        if (!recipes) {
          return res.status(404).send({
            status: 'Fail',
            message: 'can not update non-existing recipe'
          });
        }
        if (recipes.dataValues.userId === req.loggedInUser.id) {
          return recipes
            .update({
              name: req.body.name || recipes.dataValues.name,
              content: req.body.content || recipes.dataValues.content
            })
            .then((updateRecipe) => {
              if (!updateRecipe) {
                return res.status(500).send({
                  status: 'Fail',
                  message: 'error occured during update, try again'
                });
              }
              res.status(200).send({
                status: 'Success',
                message: 'recipe update successful',
                data: updateRecipe
              });
            })
            .catch(updateRecipeError => res.status(500).send({
              status: 'Fail',
              message: 'error updating recipe',
              error: updateRecipeError.toString()
            }));
        }
        res.status(401).send({
          status: 'Fail',
          message: 'unauthorized, recipe belongs to another user'
        });
      })
      .catch(error => res.status(500).send({
        status: 'Fail',
        message: 'error getting recipes',
        error: error.toString()
      }));
  }
  /**
    * @description Allows authorized user delete own recipe
    * @static
    * @param {object} req Client's request
    * @param {object} res Server Response
    * @returns {object} Recipe
    * @memberof recipeController
   */
  static destroy(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Recipe not found, nothing to destroy'
          });
        }
        if (recipe.dataValues.userId === req.loggedInUser.id) {
          return recipe
            .destroy()
            .then(() => res.status(200).send({
              status: 'Success',
              message: 'recipe successfully deleted'
            }))
            .catch(error => res.status(500).send({
              status: 'Fail',
              message: 'unexpected error occured deleting recipe',
              error: error.toString()
            }));
        }
        res.status(401).send({
          status: 'Fail',
          message: 'unauthorized, recipe belongs to another user'
        });
      })
      .catch(error => res.status(500).send({
        status: 'Fail',
        message: 'unexpected error occured',
        error: error.toString()
      }));
  }
}
