const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCreateCategory = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

module.exports = {
  validateLogin,
  validateCreateCategory,
};