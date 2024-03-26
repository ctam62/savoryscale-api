const knex = require("knex")(require("../knexfile"));
const jcc = require("json-case-convertor");
const { handleError, handleNotFound, handleBadRequest } = require("../utils/errorHandlers");
const { validateShoppingInput } = require("../utils/validation");


const getAllItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const items = await knex('shopping').where('user_id', userId);
        const { created_at, updated_at, ...itemsData } = { ...items };
        res.status(200).json(jcc.camelCaseKeys(Object.values(itemsData)));
    } catch (error) {
        handleError(res, `Error getting shopping list items: ${error}`);
    }
};

const getItemById = async (req, res) => {
    const itemId = req.params.id;

    try {
        const item = await knex('shopping').where('id', itemId).first();
        if (!item) {
            return handleNotFound(res, `Item with ID ${itemId} not found.`);
        }
        const { created_at, updated_at, ...itemData } = { ...item };
        res.status(200).json(jcc.camelCaseKeys(itemData));
    } catch (error) {
        handleError(res, `Error getting shopping list item: ${error}`);
    }
};

const createItem = async (req, res) => {
    const {
        name,
        image,
        origPrice,
        price,
        amount,
        userId
    } = req.body;

    if (!validateShoppingInput(req.body)) {
        return handleBadRequest(req, "Shopping item is missing some required fields.")
    }

    try {
        const [itemId] = await knex('shopping')
            .insert({
                user_id: userId,
                name,
                image,
                orig_price: origPrice,
                price,
                amount
            }, ['id']);

        const newItem = await knex('shopping').where('id', itemId.id);

        const { created_at, updated_at, ...newItemData } = { ...newItem };
        res.status(201).json(jcc.camelCaseKeys(Object.values(newItemData)));
    } catch (error) {
        handleError(res, `Error adding shopping list item: ${error}`);
    }
};

const updateItem = async (req, res) => {
    const itemId = req.params.id;

    try {
        const updatedRows = await knex('shopping').where('id', itemId).update(req.body);
        if (updatedRows === 0) {
            return handleNotFound(res, `Item with ID ${itemId} not found.`);
        }
        const updatedItem = await knex('shopping').where('id', itemId).first();
        res.status(200).json(updatedItem);
    } catch (error) {
        handleError(res, `Error updating item: ${error}`);
    }
};

const deleteItem = async (req, res) => {
    const itemId = req.params.id;

    try {
        await knex('shopping').where('id', itemId).del();
        if (deletedRows === 0) {
            return handleNotFound(res, `Item with ID ${itemId} not found.`);
        }
        res.status(204).send();
    } catch (error) {
        handleError(res, `Error deleting item: ${error}`);
    }
};

const deleteAllItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        await knex('shopping').where('user_id', userId).del();
        res.status(204).send();
    } catch (error) {
        handleError(res, `Error updating item: ${error}`);
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    deleteAllItems
};