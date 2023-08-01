const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

      res.render('homepage');

  });
  

module.exports = router;