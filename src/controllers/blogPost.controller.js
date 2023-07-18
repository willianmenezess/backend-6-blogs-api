const { blogPostService, userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPostAndPostCategories = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req.payload;
  const { dataValues } = await userService.getUserByEmail(user.email);
  const { status, data } = await blogPostService
  .createBlogPostAndPostCategories(title, content, dataValues.id, categoryIds);
  return res.status(mapStatusHTTP(status)).json(data);
};

const allPostsWithUserAndCategories = async (_req, res) => {
  const { status, data } = await blogPostService.allPostsWithUserAndCategories();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getPostByPk = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await blogPostService.getPostByPk(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
  getPostByPk,
};