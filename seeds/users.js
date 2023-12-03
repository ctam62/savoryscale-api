exports.seed = async function (knex) {
    await knex('user').del()
    await knex('user').insert([
        {
            id: 1,
            username: "admin",
            password_token: "test",
        }
    ]);
};