const blogPostRoute = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateJWT } = require('../middlewares');

blogPostRoute.get('/', validateJWT
.validateJWT, blogPostController.allPostsWithUserAndCategories);

blogPostRoute.post('/', validateJWT.validateJWT, blogPostController
.createBlogPostAndPostCategories);

module.exports = blogPostRoute;