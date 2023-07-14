const joi = require('joi');

const inputUserSchema = joi.object({
	displayName: joi.string().min(8).required().messages({
		'string.min': '"displayName" length must be at least 8 characters long',
	}),
	email: joi.string().email().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required()
	.messages({
		'string.pattern.base': '"email" must be a valid email',
		'string.email': '"email" must be a valid email',
	}),
	password: joi.string().min(6).required().messages({
		'string.min': '"password" length must be at least 6 characters long',
	}),
	image: joi.string(),
});

module.exports = {
	inputUserSchema,
};