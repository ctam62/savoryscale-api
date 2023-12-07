const knex = require("knex")(require("../knexfile"));
const { handleError, handleNotFound, handleBadRequest } = require("../utils/errorHandlers");


const getAllRecipes = async (_req, res) => {
    try {
        const recipes = await knex('recipe');
        res.status(200).json(recipes);
    } catch (error) {
        handleError(res, `Error getting recipes: ${error}`);
    }
};

const getRecipeById = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await knex('recipe').where('id', recipeId).first();
        if (!recipe) {
            return handleNotFound(res, `Recipe with ID ${recipeId} not found.`);
        }
        res.status(200).json(recipe);
    } catch (error) {
        handleError(res, `Error getting recipe: ${error}`);
    }
};

const createRecipe = async (req, res) => {
    const {
        recipe_id,
        user_id,
        title,
        summary,
        vegetarian,
        vegan,
        glutenFree,
        dairyFree,
        veryHealthy,
        veryPopular,
        creditsText,
        sourceName,
        sourceUrl,
        image,
        imageType,
        readyInMinutes,
        origServings,
        servings,
        pricePerServing,
        analyzedInstructions,
        cuisines,
        dishTypes,
        diets,
        nutrition,
        ingredients,
        totalCost,
        equipment
    } = req.body;

    if (!title) {
        return handleBadRequest(res, "Recipe title is required.");
    }

    try {
        const [recipeId] = await knex('recipe')
            .insert({
                user_id,
                recipe_id,
                title,
                summary,
                vegetarian,
                vegan,
                gluten_free: glutenFree,
                dairy_free: dairyFree,
                very_healthy: veryHealthy,
                very_popular: veryPopular,
                credits_text: creditsText,
                source_name: sourceName,
                source_url: sourceUrl,
                image,
                image_type: imageType,
                ready_in_minutes: readyInMinutes,
                orig_servings: origServings,
                servings,
                price_per_serving: pricePerServing,
                analyzed_instructions: analyzedInstructions,
                cuisines,
                dish_types: dishTypes,
                diets,
                nutrients: nutrition.nutrients,
                weight_per_serving: nutrition.weightPerServing,
                ingredients,
                total_cost: totalCost,
                equipment
            }, ['id']);

        const newRecipe = await knex('recipe').where('id', recipeId.id);

        res.status(201).json(newRecipe);
    } catch (error) {
        handleBadRequest(`Error creating recipe: ${error}`);
    }
};

const deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const deletedRows = await knex('recipe').where('id', recipeId).del();
        if (deletedRows === 0) {
            return handleNotFound(res, `Recipe with ID ${recipeId} not found.`);
        }
        res.status(204).send();
    } catch (error) {
        handleError(res, `Error deleting recipe: ${error}`);
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipe
};