const { getPayload } = require('../auth/authorizFunctions');
const { userService } = require('../services');
// const mapStatusHTTP = require('../utils/mapStatusHTTP');

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

const validateJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
    const token = extractToken(authorization);
    const payload = getPayload(token);
    const { data } = await userService.getAllUsers();
    const userExists = data.some((userDB) => userDB.email === payload.user.email);
    if (!userExists) return res.status(401).json({ message: 'Expired or invalid token' });
    req.payload = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const validateJWTwithoutBaerer = async (req, res, next) => {
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
    if (!userExists) return res.status(401).json({ message: 'Expired or invalid token' });
    req.payload = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
  validateJWTwithoutBaerer,
};