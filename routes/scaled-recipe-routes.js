const router = require("express").Router();
const scaledRecipeController = require("../controllers/scaled-recipe-controller");

router
    .route('/')
    .get(scaledRecipeController.getAllScaledRecipes)
    .post(scaledRecipeController.createScaledRecipe);

router
    .route('/:id')
    .get(scaledRecipeController.getScaledRecipeById);

module.exports = router;