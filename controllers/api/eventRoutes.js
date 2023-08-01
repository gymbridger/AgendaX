const router = require('express').Router();
const sequelize = require('sequelize');
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {const eventData = await Event.create({
    name: req.body.name,
    description: req.body.description,
    due_date: req.body.due_date,
    user_id: req.session.userId
  });
  eventData = eventData.get({plain: true});
    res.send(eventData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
