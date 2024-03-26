require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jcc = require("json-case-convertor");
const { handleError, handleUserNotFound, handleUserBadRequest, handleUnauthorized } = require("../utils/errorHandlers");


const saltRounds = 10;

const getAllUsers = async (_req, res) => {
    try {
        const users = await knex('user');
        res.status(200).json(users);
    } catch (error) {
        handleError(error, res, `Error getting users: ${error}`);
    }
};

const checkUserByEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return handleUserBadRequest(res, "Please enter an email");
    }

    if (!email.includes("@")) {
        return handleUserBadRequest(res, "Please enter a valid email address");
    }

    try {
        const user = await knex('user').where('email', email).first();
        if (!user) {
            return handleUserNotFound(res, `User with email ${email} does not exist.`);
        }
        const { created_at, updated_at, ...userData } = { ...user };
        delete userData.password;

        res.status(200).json(jcc.camelCaseKeys(userData));
    } catch (error) {
        handleError(res, `Error getting user: ${error}`);
    }

}

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return handleUserBadRequest(res, "Please enter in all the required fields");
    }

    if (!email.includes("@")) {
        return handleUserBadRequest(res, "Please enter a valid email address");
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {

        const userEmailExists = await knex('user').where('email', email).first();
        if (userEmailExists) {
            return handleUserBadRequest(res, "An account with that email already exists");
        }

        const usernameExists = await knex('user').where('username', username).first();
        if (usernameExists) {
            return handleUserBadRequest(res, "That username has already been taken");
        }

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
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    const { username, email, password } = req.body;

    if (!email.includes("@")) {
        return handleUserBadRequest(res, "Please enter a valid email address");
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const updatedRows = await knex('user')
            .where('email', decoded.email)
            .update({ username, email, password });
        if (updatedRows === 0) {
            return handleUserNotFound(res, `User with email: ${email} not found.`);
        }

        const updatedUser = await knex('user').where('email', decoded.email).first();
        delete updatedUser.password;

        res.status(200).json(updatedUser);
    } catch (error) {
        handleError(res, `Error updating user information: ${error}`);
    }

};

const deleteUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);
        const deletedUser = await knex('user').where({ email: decoded.email }).del();

        if (deletedUser === 0) {
            return handleUserNotFound(res, `User not found.`);
        }
        res.status(204).send();
    } catch (error) {
        return handleError(res, `Error deleting user: ${error}`);
    }
};

module.exports = {
    getAllUsers,
    checkUserByEmail,
    createUser,
    loginUser,
    getCurrentUser,
    updateUser,
    deleteUser,
};