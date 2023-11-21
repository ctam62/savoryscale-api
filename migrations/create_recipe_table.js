exports.up = function (knex) {
    return knex.schema.createTable('recipe', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('ingredients').notNullable();
        table.string('instructions').notNullable();
        table.float('cost').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('recipe');
};