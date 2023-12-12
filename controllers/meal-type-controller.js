const knex = require("knex")(require("../knexfile"));
const { handleError } = require("../utils/errorHandlers");


const getAllMealTypes = async (_req, res) => {
    try {
        const mealtypes = await knex('meal_type');
        res.status(200).json(mealtypes);
    } catch (error) {
        handleError(res, `Error getting meal types: ${error}`);
    }
};

module.exports = {
    getAllMealTypes,
};