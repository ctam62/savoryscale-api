const knex = require("knex")(require("../knexfile"));

module.exports = (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
        .integer('user_id')
        .unsigned()
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    table.integer('recipe_id').notNullable();
    table.string('title').notNullable();
    table.text('summary').notNullable();
    table.boolean('vegetarian').notNullable();
    table.boolean('vegan').notNullable();
    table.boolean('gluten_free').notNullable();
    table.boolean('dairy_free').notNullable();
    table.boolean('very_healthy').notNullable();
    table.boolean('very_popular').notNullable();
    table.string('credits_text').notNullable();
    table.string('source_name').notNullable();
    table.string('source_url').notNullable();
    table.string('image').notNullable();
    table.string('image_type').notNullable();
    table.integer('ready_in_minutes').notNullable();
    table.integer('orig_servings').notNullable();
    table.integer('servings').notNullable();
    table.float('price_per_serving').notNullable();
    table.specificType('analyzed_instructions', 'jsonb ARRAY').notNullable();
    table.specificType('cuisines', 'text ARRAY').notNullable();
    table.specificType('dish_types', 'text ARRAY').notNullable();
    table.specificType('diets', 'text ARRAY').notNullable();
    table.jsonb('nutrition').notNullable();
    table.specificType('ingredients', 'jsonb ARRAY').notNullable();
    table.float('total_cost').notNullable();
    table.specificType('equipment', 'jsonb ARRAY').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
};