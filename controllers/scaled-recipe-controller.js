const knex = require("knex")(require("../knexfile"));

const getAllScaledRecipes = async (_req, res) => {
    try {
        const recipes = await knex('scaled_recipe');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: `Error getting users: ${error}` });
    }
};

const getScaledRecipeById = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await knex('scaled_recipe').where('id', recipeId).first();
        if (!recipe) {
            return res.status(404).json({ message: `recipe with ID ${recipeId} not found.` });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: `Error getting recipe: ${error}` });
    }
};

const createScaledRecipe = async (req, res) => {
    const {
        id,
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
        return res.status(400).json({ error: "Recipe title is required" });
    }

    try {
        const [scaledRecipeId] = await knex('scaled_recipe')
            .insert({
                recipe_id: id,
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
                weight_per_serving: JSON.stringify(nutrition.weightPerServing),
                ingredients,
                total_cost: totalCost,
                equipment
            });

        const newScaledRecipe = await knex('scaled_recipe').where('id', scaledRecipeId).first();

        res.status(201).json(newScaledRecipe);
    } catch (error) {
        res.status(500).json({ error: `Error creating recipe: ${error}` });
    }
};

module.exports = {
    getAllScaledRecipes,
    getScaledRecipeById,
    createScaledRecipe
};