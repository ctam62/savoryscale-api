const router = require("express").Router();
const mealTypeController = require("../controllers/meal-type-controller");

router
    .route('/')
    .get(mealTypeController.getAllMealTypes);

module.exports = router;