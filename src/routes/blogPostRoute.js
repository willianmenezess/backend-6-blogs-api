const blogPostRoute = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateJWT, validationsInput } = require('../middlewares');

const { validateCreatePost1 } = validationsInput;

const arrayValidations = [validateJWT.validateJWT, validateCreatePost1];
blogPostRoute.get('/', validateJWT.validateJWT, blogPostController.allPostsWithUserAndCategories);

blogPostRoute.post('/', arrayValidations, blogPostController
.createBlogPostAndPostCategories);

module.exports = blogPostRoute;