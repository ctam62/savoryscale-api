const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router
    .route('/')
    .get(recipeController.getAllRecipes);

router
    .route('/:id')
    .get(recipeController.getRecipeById);

module.exports = router;