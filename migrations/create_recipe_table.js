exports.up = function (knex) {
    return knex.schema.createTable('recipe', (table) => {
        table.increments('id').primary();
        table.integer('recipeId').notNullable();
        table.string('title').notNullable();
        table.integer('readyInMinutes').notNullable();
        table.integer('servings').notNullable();
        table.string('analyzedInstructions').notNullable();
        table.float('price').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('recipe');
};