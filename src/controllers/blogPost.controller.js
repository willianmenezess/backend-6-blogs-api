const { blogPostService, userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const userIdLogged = async (req, _res) => {
  const { user } = req.payload;
  const { dataValues } = await userService.getUserByEmail(user.email);
  return dataValues.id;
};

const createBlogPostAndPostCategories = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = await userIdLogged(req);
  const { status, data } = await blogPostService
  .createBlogPostAndPostCategories(title, content, userId, categoryIds);
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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = await userIdLogged(req);
  const { status, data } = await blogPostService.updatePost(id, title, content, userId);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
  getPostByPk,
  updatePost,
};