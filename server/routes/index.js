const router = require('express').Router();

router.use('/login', require('./login'));

router.use(function (req, res, next) {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

module.exports = router;
