const router = require('express').Router();
const { User } = require('../db/index');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
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
