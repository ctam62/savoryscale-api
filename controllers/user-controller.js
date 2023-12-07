const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const getAllUsers = async (_req, res) => {
    try {
        const users = await knex('user');
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: `Error getting users: ${error}` });
    }
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
        const [userId] = await knex('user')
            .insert({
                username,
                email,
                password: hashedPassword,
            }, ['id']);

        const newUser = await knex('user').where('id', userId.id).first();
        delete newUser.password;
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send("Failed registration");
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please enter the required fields");
    }

    if (!email.includes("@")) {
        return res.status(400).send("Please enter a valid email address");
    }

    const user = await knex('user').where('email', email).first();
    if (!user) {
        return res.status(400).send("Invalid email/password combination");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send("Invalid email/password combination");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    res.json({ token });
};

const getCurrentUser = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await knex('user').where({ email: decoded.email }).first();

        if (!user) {
            return res.status(400).send("Invalid email");
        }

        delete user.password;
        res.json(user);
    } catch (error) {
        return res.status(401).send("Invalid auth token");
    }
};

const updateUser = async (req, res) => {

};

const deleteUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const deletedUser = await knex('user').where({ email: decoded.email }).del();

        if (deletedUser === 0) {
            return res.status(404).json({ message: `User not found.` });
        }
        res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user: ${error}` });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getCurrentUser,
    updateUser,
    deleteUser
};