const blogPostRoute = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateJWT, validationsInput } = require('../middlewares');

const { validateCreatePost } = validationsInput;

const arrayValidations = [validateJWT.validateJWT, validateCreatePost];
blogPostRoute.get('/', validateJWT.validateJWT, blogPostController.allPostsWithUserAndCategories);

blogPostRoute.post('/', arrayValidations, blogPostController
.createBlogPostAndPostCategories);

blogPostRoute.get('/:id', validateJWT.validateJWT, blogPostController.getPostByPk);

module.exports = blogPostRoute;