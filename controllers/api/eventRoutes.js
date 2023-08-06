const router = require('express').Router();
const { Event, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", withAuth, async (req, res) => {
  try {
    const getEvents = await Event.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(getEvents);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for displaying the event on separate page
router.get('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!eventData) {
      return res.status(404).render('error-404');
    }

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for displaying in edit modal
router.get('/:id/json', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!eventData) {
      if (req.accepts('json')) {
        return res.status(404).json({ error: 'Event not found' });
      } else {
        return res.status(404).render('error-404');
      }
    }

    const event = eventData.get({ plain: true });

    if (req.accepts('json')) {
      // success returns the event details as JSON
      return res.json(event);
    } else {
      // render the 'event' template if no JSON
      res.render('event', {
        ...event,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// edit event by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData[0]) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
