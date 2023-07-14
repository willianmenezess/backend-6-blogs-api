const userRoute = require('express').Router();
const { userController } = require('../controllers');
const { validationsInput } = require('../middlewares');

userRoute.post('/', validationsInput.validateLogin, userController.createUser);

module.exports = userRoute;