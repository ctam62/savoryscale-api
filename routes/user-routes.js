const router = require("express").Router();
const userController = require('../controllers/user-controller');

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/register')
    .post(userController.createUser);

router
    .route('/login')
    .post(userController.loginUser);

router
    .route('/current')
    .get(userController.getCurrentUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router
    .route('/current/saved-recipes')
    .get(userController.getUserSavedRecipes);

router
    .route('/current/scaled-recipes')
    .get(userController.getUserScaledRecipes);

router
    .route('/current/shopping')
    .get(userController.getUserShoppingList);

router
    .route('/current/recipes')
    .get(userController.getUserRecipes);

module.exports = router;