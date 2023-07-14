const loginRoute = require('express').Router();
const { loginController } = require('../controllers');
const { validationsInput } = require('../middlewares');

loginRoute.post('/', validationsInput.validateLogin, loginController.handleLogin);

module.exports = loginRoute;