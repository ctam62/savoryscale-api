const router = require("express").Router();
const scaledRecipeController = require("../controllers/recipe-controller");

router
    .route('/:userId/:table')
    .get(scaledRecipeController.getAllRecipes)
    .post(scaledRecipeController.createRecipe)
    .delete(scaledRecipeController.deleteAllRecipes);

router
    .route('/:userId/:table/:id')
    .get(scaledRecipeController.getRecipeById)
    .patch(scaledRecipeController.updateRecipe)
    .delete(scaledRecipeController.deleteRecipe);

module.exports = router;