const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');
const { validateCategoryIds, validateSearchTherm } = require('./validationsInputValues');

const createBlogPostAndPostCategories = async (title, content, userId, categoryIds) => {
  const allCategories = await Category.findAll();
  const error = validateCategoryIds(categoryIds, allCategories);
  if (error) return error;
  const data = new Date();
  const result = await sequelize.transaction(async (t) => {
    const blogPost = await BlogPost
    .create({ title, content, userId, published: data, updated: data }, { transaction: t });
    const postCategories = categoryIds.map((categoryId) => ({
      postId: blogPost.dataValues.id,
      categoryId,
    }));
    await PostCategory.bulkCreate(postCategories, { transaction: t });
    return { status: 'CREATED', data: blogPost };
  });
  return result;
};

const allPostsWithUserAndCategories = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: blogPosts };
};

const getPostByPk = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!blogPost) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data: blogPost };
};

const authorizedUpdate = async (id, userIdLogged) => {
  const { userId } = await BlogPost.findByPk(id);
  if (userId !== userIdLogged) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  return false;
};

const updatePost = async (id, title, content, userIdLogged) => {
  const error = await authorizedUpdate(id, userIdLogged);
  if (error) return error;
  const data = new Date();
  const blogPost = await BlogPost.update(
    { title, content, updated: data },
    { where: { id } },
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
  );
  if (!blogPost) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  const getUpdatedPost = await getPostByPk(id);
  return { status: 'SUCCESSFUL', data: getUpdatedPost.data };
};

const deletePost = async (id, userIdLogged) => {
  const blogPostExist = await BlogPost.findByPk(id);
  if (!blogPostExist) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  const error = await authorizedUpdate(id, userIdLogged);
  if (error) return error;
  await BlogPost.destroy({ where: { id } });
  return { status: 'DELETED', data: '' };
};

const getPostByTherm = async (therm) => {
  const allPosts = await allPostsWithUserAndCategories();
  const error = validateSearchTherm(therm, allPosts.data);
  if (error) return error;
  const blogPost = await BlogPost.findAll({
    where: { 
      [Op.or]: [
      { title: { [Op.like]: `%${therm}%` } },
      { content: { [Op.like]: `%${therm}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: blogPost };
};

module.exports = { 
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
  getPostByPk,
  updatePost,
  deletePost,
  getPostByTherm,
};