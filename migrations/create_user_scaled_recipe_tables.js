exports.up = function (knex) {
    return knex.schema
        .createTable('user', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password_token').notNullable();
            table.string('profile_img').notNullable();
        })
        .createTable('scaled_recipe', (table) => {
            table.increments('id').primary();
            table
                .integer('user_id')
                .unsigned()
                .references('user.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('title').notNullable();
            table.string('ingredients').notNullable();
            table.string('instructions').notNullable();
            table.string('cost').nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table
                .timestamp('updated_at')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('scaled_recipe').dropTable('user');
};