const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const createBlogPostAndPostCategories = async (title, content, userId, categoryIds) => {
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

module.exports = { 
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
};