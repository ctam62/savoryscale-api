const knex = require("knex")(require("../knexfile"));

const getAllUsers = async (_req, res) => {
    try {
        const users = await knex('user');
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: `Error getting users: ${error}` });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await knex('user').where('id', userId).first();
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: `Error getting user: ${error}` });
    }
}

module.exports = {
    getAllUsers,
    getUserById
};