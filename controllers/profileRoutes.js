const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // If the user is logged in, render the dashboard template
    const eventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'name', 'description', 'starting_date', 'ending_date'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));
    res.render('profile', { events, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
