const router = require('express').Router();
const sequelize = require('sequelize');
const { User } = require('../../models');

router.post('/', async (req, res) => {
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
    } catch (err) {
        console.log('Error')
        res.status(400).json(err);
    }
});

module.exports = router;