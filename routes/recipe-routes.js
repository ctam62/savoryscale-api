const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router
    .route('/')
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipe);

router
    .route('/:id')
    .get(recipeController.getRecipeById)
    .delete(recipeController.delelteRecipe);

module.exports = router;