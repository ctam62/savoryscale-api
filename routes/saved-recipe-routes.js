const router = require("express").Router();
const savedRecipeController = require("../controllers/recipe-controller");

router
    .route('/:userId/:table')
    .get(savedRecipeController.getAllRecipes)
    .post(savedRecipeController.createRecipe)
    .delete(savedRecipeController.deleteAllRecipes);

router
    .route('/:userId/:table/:id')
    .get(savedRecipeController.getRecipeById)
    .delete(savedRecipeController.deleteRecipe);

module.exports = router;