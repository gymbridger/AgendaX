const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// catch all
router.get('*', (req, res) => {
  // redirect the user back to the home page
  res.redirect('/');
});

module.exports = router;
