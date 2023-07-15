const userRoute = require('express').Router();
const { userController } = require('../controllers');
const { validationsInput } = require('../middlewares');
const { validateJWT } = require('../middlewares/validateJWT');

userRoute.post('/', validationsInput.validateLogin, userController.createUser);
userRoute.get('/', validateJWT, userController.getAllUsers);

module.exports = userRoute;