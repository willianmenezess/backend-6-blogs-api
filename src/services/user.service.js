const { User } = require('../models');

const getByUserEmail = async (email) => {
	const user = await User.findOne({ where: { email } });
	return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
	getByUserEmail,
};