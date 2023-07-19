const { inputUserSchema } = require('./joiSchemas');

const validateUserValues = (userFromDB, password) => {
  if (!userFromDB || password !== userFromDB.password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }
  return false;
};

const validateCreateUser = (userData, allUsers) => {
  const { error } = inputUserSchema.validate(userData);
  if (error) {
    return { status: 'BAD_REQUEST', data: { message: error.message } };
  }
  const userExists = allUsers.data.find((user) => user.email === userData.email);
  if (userExists) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
  return false;
};

const validateCategoryIds = (categoryIds, allCategories) => {
  const categoryIdsExists = categoryIds.every((categoryId) => {
    const categoryFound = allCategories.find((category) => category.id === categoryId);
    return categoryFound;
  });
  if (!categoryIdsExists) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  return false;
};

const validateSearchTherm = (searchTerm, allPosts) => {
  if (!searchTerm || searchTerm === '') {
    return { status: 'SUCCESSFUL', data: allPosts };
  }
  return false;
};

module.exports = {
  validateUserValues,
  validateCreateUser,
  validateCategoryIds,
  validateSearchTherm,
};