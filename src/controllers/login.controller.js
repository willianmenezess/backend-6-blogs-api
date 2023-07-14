const { createToken } = require('../auth/authorizFunctions');
const { userService } = require('../services');
const  mapStatusHTTP  = require('../utils/mapStatusHTTP');

const handleLogin = async (req, res) => {
  const { email } = req.body;
	const { status } = await userService.getByUserEmail(email);

  const { password: _, ...userWithoutPassword } = req.body;
	const payload = { user: userWithoutPassword };
	const token = createToken(payload);
	return res.status(mapStatusHTTP(status)).json({ token });
};

module.exports = {
	handleLogin,
};