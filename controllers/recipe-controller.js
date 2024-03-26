const knex = require("knex")(require("../knexfile"));
const jcc = require("json-case-convertor");
const { handleError, handleNotFound, handleBadRequest } = require("../utils/errorHandlers");
const { validateRecipeInput, validateSavedRecipeInput } = require("../utils/validation");


const getAllRecipes = async (req, res) => {
    const userId = req.params.userId;
    const table = req.params.table;

    try {
        const recipes = await knex(table).where("user_id", userId);
        const { created_at, updated_at, ...recipesData } = { ...recipes };
        res.status(200).json(jcc.camelCaseKeys(Object.values(recipesData)));
    } catch (error) {
        handleError(res, `Error getting recipes: ${error}`);
    }
};

const getRecipeById = async (req, res) => {
    const recipeId = req.params.id;
    const table = req.params.table;

    try {
        const recipe = await knex(table).where('id', recipeId).first();
        if (!recipe) {
            return handleNotFound(res, `Recipe with ID ${recipeId} not found.`);
        }
        const { created_at, updated_at, ...recipeData } = { ...recipe };
        res.status(200).json(jcc.camelCaseKeys(recipeData));
    } catch (error) {
        handleError(res, `Error getting recipe: ${error}`);
    }
};

const createRecipe = async (req, res) => {
    const userId = req.params.userId;
    const table = req.params.table;

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

    if (table === 'saved_recipe') {
        if (!validateSavedRecipeInput(req.body)) {
            return handleBadRequest(res, "There are missing recipe fields.");
        }
    } else {
        if (!validateRecipeInput(req.body)) {
            return handleBadRequest(res, "Please fill in all the recipe fields.");
        }
    }

    try {
        if (table === 'saved_recipe') {
            const [newRecipeId] = await knex(table)
                .insert({
                    user_id: userId,
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
                    servings,
                    price_per_serving: pricePerServing,
                    analyzed_instructions: analyzedInstructions,
                    cuisines,
                    dish_types: dishTypes,
                    diets,
                    nutrition: nutrition
                }, ['id']);

            const newRecipe = await knex(table).where('id', newRecipeId.id);
            res.status(201).json(jcc.camelCaseKeys(Object.values(newRecipe)));

        } else {
            const [newRecipeId] = await knex(table)
                .insert({
                    user_id: userId,
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

            const newRecipe = await knex(table).where('id', newRecipeId.id);
            const { created_at, updated_at, ...newRecipeData } = { ...newRecipe };
            res.status(201).json(jcc.camelCaseKeys(Object.values(newRecipeData)));
        }
    } catch (error) {
        handleError(res, `Error adding recipe: ${error}`);
    }
};

const updateRecipe = async (req, res) => {
    const recipeId = req.params.id;
    const table = req.params.table;

    try {
        const updatedRows = await knex(table).where('id', recipeId).update(req.body);
        if (updatedRows === 0) {
            return handleNotFound(res, `Recipe with ID ${recipeId} not found.`);
        }
        const updatedRecipe = await knex(table).where('id', recipeId).first();
        res.status(200).json(updatedRecipe);
    } catch (error) {
        handleError(res, `Error updating recipe: ${error}`);
    }
};

const deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;
    const table = req.params.table;

    try {

        if (table === 'saved_recipe') {
            const deletedRows =
                await knex(table).where('recipe_id', recipeId).del() ||
                await knex(table).where('id', recipeId).del();

            if (deletedRows === 0) {
                return handleNotFound(res, `Recipe with ID ${recipeId} not found.`);
            }
        } else {
            const deletedRows = await knex(table).where('id', recipeId).del();

            if (deletedRows === 0) {
                return handleNotFound(res, `Recipe with ID ${recipeId} not found.`);
            }
        }

        res.status(204).send();
    } catch (error) {
        handleError(res, `Error deleting recipe: ${error}`);
    }
};

const deleteAllRecipes = async (req, res) => {
    const userId = req.params.userId;
    const table = req.params.table;

    try {
        await knex(table).where('user_id', userId).del();
        res.status(204).send();
    } catch (error) {
        handleError(res, `Error deleting recipes: ${error}`);
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    deleteAllRecipes
};