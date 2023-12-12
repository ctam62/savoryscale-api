const knex = require("knex")(require("../knexfile"));

module.exports = (table) => {
    table.increments('id').primary();
    table
        .integer('user_id')
        .unsigned()
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.float('orig_price').notNullable();
    table.float('price').notNullable();
    table.jsonb('amount').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
};