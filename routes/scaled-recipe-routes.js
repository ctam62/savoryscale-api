const router = require("express").Router();
const scaledRecipeController = require("../controllers/scaled-recipe-controller");

router
    .route('/')
    .get(scaledRecipeController.getAllScaledRecipes)
    .post(scaledRecipeController.createScaledRecipe)
    .delete(scaledRecipeController.deleteAllRecipes);

router
    .route('/:id')
    .get(scaledRecipeController.getScaledRecipeById)
    .delete(scaledRecipeController.deleteScaledRecipe);

module.exports = router;