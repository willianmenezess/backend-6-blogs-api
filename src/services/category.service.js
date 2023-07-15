const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

module.exports = {
  createCategory,
};