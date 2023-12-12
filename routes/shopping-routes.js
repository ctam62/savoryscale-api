const router = require("express").Router();
const shoppingController = require("../controllers/shopping-controller");

router
    .route('/:userId/list/shopping')
    .get(shoppingController.getAllItems)
    .post(shoppingController.createItem)
    .delete(shoppingController.deleteAllItems);

router
    .route('/:userId/list/shopping/:id')
    .get(shoppingController.getItemById)
    .patch(shoppingController.updateItem)
    .delete(shoppingController.deleteItem);

module.exports = router;