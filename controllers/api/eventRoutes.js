const router = require("express").Router();
const { Event, User } = require("../../models");
const withAuth = require("../../utils/auth");
const { format } = require("date-fns");

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

router.get("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!eventData) {
      return res.status(404).render("error-404");
    }

    const event = eventData.get({ plain: true });

    res.render("event", {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/edit", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!eventData) {
      return res.status(404).render("error-404");
    }

    const event = eventData.get({ plain: true });

    res.render("editEvent", {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/edit", withAuth, async (req, res) => {
  try {
    const eventData = await Event.update(
      {
        name: req.body["event-name"],
        starting_date: req.body["start-time"],
        ending_date: req.body["end-time"],
        // Add more properties as needed
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!eventData[0]) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    // Redirect to the profile page after a successful update
    res.redirect("/profile");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
