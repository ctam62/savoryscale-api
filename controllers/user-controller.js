require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { handleError, handleNotFound, handleUserBadRequest, handleUnauthorized } = require("../utils/errorHandlers");

const saltRounds = 10;

const getAllUsers = async (_req, res) => {
    try {
        const users = await knex('user');
        res.status(200).json(users);
    } catch (error) {
        handleError(error, res, `Error getting users: ${error}`);
    }
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return handleUserBadRequest(res, "Please enter the required fields.");
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
        handleUserBadRequest(res, `Failed registration: ${error}`);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return handleUserBadRequest(res, "Please enter in all the required fields");
    }

    if (!email.includes("@")) {
        return handleUserBadRequest(res, "Please enter a valid email address");
    }

    const user = await knex('user').where('email', email).first();
    if (!user) {
        return handleUserBadRequest(res, "Invalid email/password combination");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return handleUserBadRequest(res, "Invalid email/password combination");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    res.status(200).json({ token });
};

const getCurrentUser = async (req, res) => {
    if (!req.headers.authorization) {
        return handleUnauthorized(res, "Please login");
    }

    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await knex('user').where({ email: decoded.email }).first();

        if (!user) {
            return handleUserBadRequest(res, "Invalid email");
        }

        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        return handleUnauthorized(res, "Invalid auth token");
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
            return handleNotFound(res, `User not found.`);
        }
        res.status(204).send();
    } catch (error) {
        return handleError(res, `Error deleting user: ${error}`);
    }
};

const getUserSavedRecipes = async (req, res) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await knex('user').where({ email: decoded.email }).first();

        if (user === 0) {
            return handleNotFound(res, `User not found.`);
        }

        const savedRecipes = await knex('saved_recipe').where({ user_id: user.id }).first();

        res.status(200).json(savedRecipes);
    } catch (error) {
        return handleError(res, `Error getting user saved recipes: ${error}`);
    }

};

const getUserScaledRecipes = async (req, res) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await knex('user').where({ email: decoded.email }).first();

        if (user === 0) {
            return handleNotFound(res, `User not found.`);
        }

        const scaledRecipes = await knex('scaled_recipe').where({ user_id: user.id }).first();

        res.status(200).json(scaledRecipes);
    } catch (error) {
        return handleError(res, `Error getting user scaled recipes: ${error}`);
    }

};

const getUserShoppingList = async (req, res) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await knex('user').where({ email: decoded.email }).first();

        if (user === 0) {
            return handleNotFound(res, `User not found.`);
        }

        const shoppingList = await knex('shopping').where({ user_id: user.id }).first();

        res.status(200).json(shoppingList);
    } catch (error) {
        return handleError(res, `Error getting user shopping lsit: ${error}`);
    }

};

const getUserRecipes = async (req, res) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await knex('user').where({ email: decoded.email }).first();

        if (user === 0) {
            return handleNotFound(res, `User not found.`);
        }

        const recipes = await knex('recipe').where({ user_id: user.id }).first();

        res.status(200).json(recipes);
    } catch (error) {
        return handleError(res, `Error getting user recipes: ${error}`);
    }
};


module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getCurrentUser,
    updateUser,
    deleteUser,
    getUserSavedRecipes,
    getUserScaledRecipes,
    getUserShoppingList,
    getUserRecipes
};