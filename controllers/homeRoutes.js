const { User, Event, Date } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('sequelize');
module.exports = router;

router.get('/', async (req, res) => {

      res.render('homepage');

  });
  

module.exports = router;
