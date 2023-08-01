const router = require('express').Router();
const sequelize = require('sequelize');
const { User, Event, Date} = require('../../models');

router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      // adds id and username to the session so that they can be displayed
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId  = dbUserData.get({plain:true}).id;
        req.session.firstName  = dbUserData.get({plain:true}).first_name;
        res.status(200).end();
      });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });  
module.exports = router; 