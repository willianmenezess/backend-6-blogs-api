const { inputUserSchema } = require('./joiSchemas');

const validateUserValues = (userFromDB, password) => {
  if (!userFromDB || password !== userFromDB.password) {
		return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
	}
	return false;
}

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
}

module.exports = {
	validateUserValues,
	validateCreateUser,
};