const blogPostRoute = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateJWT, validationsInput } = require('../middlewares');

const { validateCreatePost, validateUpdatePost } = validationsInput;

const arrayValidations1 = [validateJWT.validateJWT, validateCreatePost];
const arrayValidations2 = [validateJWT.validateJWT, validateUpdatePost];

blogPostRoute.get('/', validateJWT.validateJWT, blogPostController.allPostsWithUserAndCategories);

blogPostRoute.post('/', arrayValidations1, blogPostController
.createBlogPostAndPostCategories);

blogPostRoute.get('/search', validateJWT.validateJWT, blogPostController.getPostByTherm);

blogPostRoute.get('/:id', validateJWT.validateJWT, blogPostController.getPostByPk);

blogPostRoute.put('/:id', arrayValidations2, blogPostController.updatePost);

blogPostRoute.delete('/:id', validateJWT.validateJWT, blogPostController.deletePost);

module.exports = blogPostRoute;