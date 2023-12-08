const userTable = require("../table-schemas/user-table");
const recipeTable = require("../table-schemas/recipe-table");
const shoppingTable = require("../table-schemas/shopping-table");
const { onUpdateTrigger, onUpdateTimestampFunction } = require("../knexfile");


exports.up = function (knex) {
    return knex.schema
        .createTable('user', userTable)
        .createTable('saved_recipe', recipeTable)
        .createTable('scaled_recipe', recipeTable)
        .createTable('recipe', recipeTable)
        .createTable('shopping', shoppingTable)
        .raw(onUpdateTimestampFunction)
        .then(() => knex.raw(onUpdateTrigger('recipe')));;
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('shopping')
        .dropTable('recipe')
        .dropTable('scaled_recipe')
        .dropTable('saved_recipe')
        .dropTable('user');
};