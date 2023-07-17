const { Sequelize } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const createBlogPostAndPostCategories = async (title, content, userId, categoryIds) => {
  const result = await Sequelize.transaction(async (t) => {
  const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
  console.log('teste linha 7');
  const postCategories = categoryIds.map((categoryId) => ({
    postId: blogPost.id,
    categoryId,
  }));
  await PostCategory.bulkCreate(postCategories, { transaction: t });
  console.log('teste linha 13');
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

module.exports = { 
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
};