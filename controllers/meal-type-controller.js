const knex = require("knex")(require("../knexfile"));

const getAllMealTypes = async (_req, res) => {
    try {
        const mealtypes = await knex('meal_type');
        res.status(200).json(mealtypes);
    } catch (error) {
        res.status(500).json({ error: `Error getting meal types: ${error}` });
    }
};

module.exports = {
    getAllMealTypes,
};