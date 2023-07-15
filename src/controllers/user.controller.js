const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { createToken } = require('../auth/authorizFunctions');

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
  const { status, data } = await userService.getAllUsers();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createUser,
  getAllUsers,
};