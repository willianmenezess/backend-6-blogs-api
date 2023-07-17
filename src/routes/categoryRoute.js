const categoryRoute = require('express').Router();
const { categoryController } = require('../controllers');
const { validateJWT, validationsInput } = require('../middlewares');

const arrayValidations = [validationsInput.validateCreateCategory,
validateJWT.validateJWTwithoutBaerer];

categoryRoute.post('/', arrayValidations, categoryController.createCategory);
categoryRoute.get('/', validateJWT.validateJWT, categoryController.getAllCategories);

module.exports = categoryRoute;
