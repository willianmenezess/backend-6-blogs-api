const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { createToken } = require('../auth/authorizFunctions');

const userIdLogged = async (req, _res) => {
  const { user } = req.payload;
  const { dataValues } = await userService.getUserByEmail(user.email);
  return dataValues.id;
};

const createUser = async (req, res) => {
  const userData = req.body;
  const { status, data } = await userService.createUser(userData);
  if (status !== 'CREATED') return res.status(mapStatusHTTP(status)).json(data);
  const { password: _, ...userWithoutPassword } = data;
  const payload = { user: userWithoutPassword };
  const token = createToken(payload);
  return res.status(mapStatusHTTP(status)).json({ token });
};

const getAllUsers = async (_req, res) => {
  const { status, data } = await userService.getAllUsersWithoutPassword();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.getUserById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteUserLogged = async (req, res) => {
  const getUserId = await userIdLogged(req);
  const { status } = await userService.deleteUserLogged(getUserId);
  return res.status(mapStatusHTTP(status)).json();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserLogged,
};