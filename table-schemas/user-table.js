module.exports = (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('profile_img').defaultTo('/user_imgs/justice-scale1.svg');
};