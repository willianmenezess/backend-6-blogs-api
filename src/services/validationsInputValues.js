// const { User } = require('../models');

const validateUserValues = (userFromDB, password) => {
  if (!userFromDB || password !== userFromDB.password) {
		return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
	}
	return false;
}

module.exports = {
	validateUserValues,
};