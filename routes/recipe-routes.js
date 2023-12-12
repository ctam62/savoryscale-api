const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router
    .route('/:userId/:table')
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipe)
    .delete(recipeController.deleteAllRecipes);

router
    .route('/:userId/:table/:id')
    .get(recipeController.getRecipeById)
    .patch(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;