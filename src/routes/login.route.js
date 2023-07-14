const loginRoute = require('express').Router();
const { loginController } = require('../controllers');

loginRoute.post('/', loginController.handleLogin);

module.exports = loginRoute;