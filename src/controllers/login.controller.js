const { createToken } = require('../auth/authorizFunctions');
const { userService } = require('../services');
const  mapStatusHTTP  = require('../utils/mapStatusHTTP');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
	const { status, data } = await userService.getByUserEmail(email, password);

	if (status === 'BAD_REQUEST') return res.status(mapStatusHTTP(status)).json(data);
	
  const { password: _, ...userWithoutPassword } = req.body;
  const payload = { user: userWithoutPassword };
	const token = createToken(payload);
	return res.status(mapStatusHTTP(status)).json({ token });
};

module.exports = {
	handleLogin,
};