const router = require("express").Router();
const userController = require('../controllers/user-controller');

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.checkUserByEmail);

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

module.exports = router;