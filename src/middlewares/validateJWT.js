const { getPayload } = require('../auth/authorizFunctions');
const { userService } = require('../services');

const validateJWT = async (req, res, next) => {
	try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

		const payload = getPayload(authorization);
		const { data } = await userService.getAllUsers();	
		const userExists = data.some((userDB) => userDB.email === payload.user.email);
		if (!userExists) return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Expired or invalid token' });
		req.payload = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error accessing endpoint',
      error: 'A valid token is required to access this endpoint',
    });
  }
};

module.exports = {
  validateJWT,
};