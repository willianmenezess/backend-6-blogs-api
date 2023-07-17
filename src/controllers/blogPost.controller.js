const { blogPostService, userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPostAndPostCategories = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req.payload;
  const userId = userService.getByUserEmail(user.email);
  const { status, data } = await blogPostService
  .createBlogPostAndPostCategories(title, content, userId, categoryIds);
  return res.status(mapStatusHTTP(status)).json(data);
};

const allPostsWithUserAndCategories = async (req, res) => {
  const { status, data } = await blogPostService.allPostsWithUserAndCategories();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
};