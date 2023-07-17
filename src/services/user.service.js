const { User } = require('../models');
const { validateUserValues, validateCreateUser } = require('./validationsInputValues');

const getByUserEmail = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  const error = validateUserValues(user, password);
  if (error) return error;
  return { status: 'SUCCESSFUL', data: user };
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return { status: 'SUCCESSFUL', data: users };
};

const getAllUsersWithoutPassword = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
};

const createUser = async (userData) => {
  const { displayName, email, password, image } = userData;
  const allUsers = await getAllUsers();
  const error = validateCreateUser(userData, allUsers);
  if (error) return error;
  const user = await User.create({ displayName, email, password, image });
  return { status: 'CREATED', data: user };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  return { status: 'SUCCESSFUL', data: user };
};

const getUserByEmail = async (email) => {
  const userFromDB = await User.findOne({ where: { email } });
  return userFromDB;
};

module.exports = {
  getByUserEmail,
  createUser,
  getAllUsers,
  getAllUsersWithoutPassword,
  getUserById,
  getUserByEmail,
};