exports.seed = async function (knex) {
    await knex("meal_type").del()
    await knex("meal_type").insert([
        {
            id: 1,
            name: "Breakfast"
        },
        {
            id: 2,
            name: "Snack"
        },
        {
            id: 3,
            name: "Appetizer"
        },
        {
            id: 4,
            name: "Main Course"
        },
        {
            id: 5,
            name: "Dessert"
        },
        {
            id: 6,
            name: "Soup"
        },
        {
            id: 7,
            name: "Salad"
        },
        {
            id: 8,
            name: "Drink"
        },
        {
            id: 9,
            name: "Bread"
        },
        {
            id: 10,
            name: "Sauce"
        },
    ]);
};