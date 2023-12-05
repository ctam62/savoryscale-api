const { onUpdateTrigger, onUpdateTimestampFunction } = require('../knexfile');

exports.up = function (knex) {
    return knex.schema
        .createTable('user', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password_token').notNullable();
            table.string('profile_img').defaultTo('/user_imgs/justice-scale1.svg');
        })
        .createTable('scaled_recipe', (table) => {
            table.increments('id').primary();
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
        })
        .createTable('recipe', (table) => {
            table.increments('id').primary();
            table
                .integer('user_id')
                .unsigned()
                .references('user.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('recipe_id').notNullable();
            table.string('title').notNullable();
            table.string('summary').notNullable();
            table.boolean('very_healthy').notNullable();
            table.boolean('very_popular').notNullable();
            table.string('credits_text').notNullable();
            table.string('source_name').notNullable();
            table.string('image').notNullable();
            table.string('image_type').notNullable();
            table.string('license').notNullable();
            table.integer('ready_in_minutes').notNullable();
            table.integer('orig_servings').notNullable();
            table.integer('servings').notNullable();
            table.float('price_per_serving').notNullable();
            table.specificType('analyzed_instructions', 'jsonb ARRAY').notNullable();
            table.specificType('cuisines', 'text ARRAY').notNullable();
            table.specificType('dish_types', 'text ARRAY').notNullable();
            table.specificType('diets', 'text ARRAY').notNullable();
            table.jsonb('nutrition').notNullable();
            table.specificType('ingredients', 'jsonb  ARRAY').notNullable();
            table.float('total_cost').notNullable();
            table.specificType('equipment', 'jsonb  ARRAY').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .raw(onUpdateTimestampFunction)
        .then(() => knex.raw(onUpdateTrigger('recipe')));;
};

exports.down = function (knex) {
    return knex.schema.dropTable('scaled_recipe').dropTable('recipe').dropTable('user');
};