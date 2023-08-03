const { User, Event, Date } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Event } = require('../models');

router.get('/', async (req, res) => {

router.get('/home', async (req, res) => {
  try {
    res.render('homepage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.get('/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      // If the user is already logged in, redirect to the 'profile' page
      return res.redirect('/profile');
    }
    // Render the 'login' page
    res.render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
=========
>>>>>>>>> Temporary merge branch 2
