const knex = require("knex")(require("../knexfile"));

const getAllRecipes = async (_req, res) => {
    try {
        const recipes = await knex('recipe');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: `Error getting users: ${error}` });
    }
};

const getRecipeById = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await knex('recipes').where('id', recipeId).first();
        if (!recipe) {
            return res.status(404).json({ message: `recipe with ID ${recipeId} not found.` });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: `Error getting recipe: ${error}` });
    }
}

module.exports = {
    getAllRecipes,
    getRecipeById
};