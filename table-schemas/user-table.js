const knex = require("knex")(require("../knexfile"));

module.exports = (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('profile_img').defaultTo('/user_imgs/justice-scale1.svg');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
};