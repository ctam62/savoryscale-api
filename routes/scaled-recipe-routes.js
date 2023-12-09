const router = require("express").Router();
const scaledRecipeController = require("../controllers/recipe-controller");

router
    .route('/:table')
    .get(scaledRecipeController.getAllRecipes)
    .post(scaledRecipeController.createRecipe)
    .delete(scaledRecipeController.deleteAllRecipes);

router
    .route('/:table/:id')
    .get(scaledRecipeController.getRecipeById)
    .delete(scaledRecipeController.deleteRecipe);

module.exports = router;