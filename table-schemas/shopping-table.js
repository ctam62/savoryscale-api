const knex = require("knex")(require("../knexfile"));

module.exports = (table) => {
    table.increments('id').primary();
    table
        .integer('user_id')
        .unsigned()
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    table.integer('recipe_id').notNullable();
    table.string('name');
    table.string('image');
    table.float('origPrice');
    table.float('price');
    table.jsonb('amount');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
};