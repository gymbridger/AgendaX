const router = require('express').Router();
const sequelize = require('sequelize');
const { User, Event, Date} = require('../../models');

router.post('/', async (req, res) =>{
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.pssword,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.get({plain:true}).id;
          res.status(200).end();
        });
    }
})
module.exports = router;