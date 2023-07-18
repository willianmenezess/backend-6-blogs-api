const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');
const { validateCategoryIds } = require('./validationsInputValues');

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

module.exports = { 
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
  getPostByPk,
};