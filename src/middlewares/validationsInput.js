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

const validateCreatePost1 = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  console.log('MIDDLEWARE AQUI:', title, content, categoryIds);
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

// const validateCreatePost2 = (req, res, next) => {
//   const { title, content, categoryIds } = req.body;
//   if (title === '' || content === '' || categoryIds === []) {
//     return res.status(400).json({ message: 'Some required fields are missing' });
//   }
//   next();
// };

module.exports = {
  validateLogin,
  validateCreateCategory,
  validateCreatePost1,
  // validateCreatePost2,
};