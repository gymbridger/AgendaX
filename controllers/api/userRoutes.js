const router = require('express').Router();
const sequelize = require('sequelize');
const { User, Event, Date} = require('../../models');

router.post('/', async (req, res) =>{
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            first_name: req.body,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.pssword,
        });
    }
})
module.exports = router;