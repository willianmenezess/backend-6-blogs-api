const { User } = require('../models');

const getByUserEmail = async (email, password) => {
	const user = await User.findOne({ where: { email } });
	if (!user || password !== user.password ) {
		return { status: 'BAD_REQUEST', data: { message: "Invalid fields"} };
	}
	return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
	getByUserEmail,
};