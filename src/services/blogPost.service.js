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

module.exports = { 
  createBlogPostAndPostCategories,
  allPostsWithUserAndCategories,
  getPostByPk,
  updatePost,
};