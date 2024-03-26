const router = require("express").Router();
const shoppingController = require("../controllers/shopping-controller");

router
    .route('/:userId')
    .get(shoppingController.getAllItems)
    .post(shoppingController.createItem)
    .delete(shoppingController.deleteAllItems);

router
    .route('/:userId/item/:id')
    .get(shoppingController.getItemById)
    .patch(shoppingController.updateItem)
    .delete(shoppingController.deleteItem);

module.exports = router;