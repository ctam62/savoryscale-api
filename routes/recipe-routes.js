const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router
    .route('/:table')
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipe)
    .delete(recipeController.deleteAllRecipes);

router
    .route('/:id')
    .get(recipeController.getRecipeById)
    .put(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;