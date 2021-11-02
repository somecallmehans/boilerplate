const router = require('express').Router();
const { User } = require('../db/index');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    res.send({token: await user.generateToken()});
  } catch (err) {
    next(err);
  }
})

router.post('/login', async (req, res, next) => {
  try {
    res.send({token: await User.authenticate(req.body)})
  } catch (err) {
    next(err);
  }
})

module.exports = router;
