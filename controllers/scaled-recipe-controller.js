const knex = require("knex")(require("../knexfile"));
const jcc = require("json-case-convertor");
const { handleError, handleNotFound, handleBadRequest } = require("../utils/errorHandlers");


const getAllScaledRecipes = async (_req, res) => {
    try {
        const scaledRecipes = await knex('scaled_recipe');
        const { created_at, updated_at, ...recipesData } = { ...scaledRecipes };
        res.status(200).json(jcc.camelCaseKeys(Object.values(recipesData)));
    } catch (error) {
        handleError(res, `Error getting scaled recipes: ${error}`);
    }
};

const getScaledRecipeById = async (req, res) => {
    const scaledRecipeId = req.params.id;

    try {
        const scaledRecipe = await knex('scaled_recipe').where('id', scaledRecipeId).first();
        if (!scaledRecipe) {
            return handleNotFound(res, `Scaled recipe with ID ${scaledRecipeId} not found.`);
        }
        const { created_at, updated_at, ...recipeData } = { ...scaledRecipe };
        res.status(200).json(jcc.camelCaseKeys(recipeData));
    } catch (error) {
        handleError(res, `Error getting scaled recipe: ${error}`);
    }
};

const createScaledRecipe = async (req, res) => {
    const {
        recipeId,
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
        const [scaledRecipeId] = await knex('scaled_recipe')
            .insert({
                user_id: 1,
                recipe_id: recipeId,
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
                nutrition: nutrition,
                ingredients,
                total_cost: totalCost,
                equipment
            }, ['id']);

        const newScaledRecipe = await knex('scaled_recipe').where('id', scaledRecipeId.id);

        const { created_at, updated_at, ...newRecipeData } = { ...newScaledRecipe };
        res.status(201).json(jcc.camelCaseKeys(Object.values(newRecipeData)));
    } catch (error) {
        handleError(res, `Error adding scaled recipe: ${error}`);
    }
};

const deleteScaledRecipe = async (req, res) => {
    const scaledRecipeId = req.params.id;

    try {
        const deletedRows = await knex('scaled_recipe').where('id', scaledRecipeId).del();
        if (deletedRows === 0) {
            return handleNotFound(res, `Scaled recipe with ID ${scaledRecipeId} not found.`);
        }
        res.status(204).send();
    } catch (error) {
        handleError(res, `Error deleting scaled recipe: ${error}`);
    }
};

const deleteAllRecipes = async (_req, res) => {
    try {
        await knex('scaled_recipe').del();
        res.status(204).send();
    } catch (error) {
        handleError(res, `Error deleting scaled recipes: ${error}`);
    }
};

module.exports = {
    getAllScaledRecipes,
    getScaledRecipeById,
    createScaledRecipe,
    deleteScaledRecipe,
    deleteAllRecipes
};