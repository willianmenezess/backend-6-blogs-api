const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};