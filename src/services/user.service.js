const { User } = require('../models');
const { validateUserValues } = require('./validationsInputValues');

const getByUserEmail = async (email, password) => {
	const user = await User.findOne({ where: { email } });
	const error = validateUserValues(user, password);
	if (error) return error;
	return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
	getByUserEmail,
};