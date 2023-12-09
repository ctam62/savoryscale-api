const router = require("express").Router();
const savedRecipeController = require("../controllers/recipe-controller");

router
    .route('/:table')
    .get(savedRecipeController.getAllRecipes)
    .post(savedRecipeController.createRecipe)
    .delete(savedRecipeController.deleteAllRecipes);

router
    .route('/:id')
    .get(savedRecipeController.getRecipeById)
    .delete(savedRecipeController.deleteRecipe);

module.exports = router;