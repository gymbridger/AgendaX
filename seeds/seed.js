const sequelize = require('../config/connection');
const {User, Event} = require('../models');

const userData = require('./user.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Event.bulkCreate(eventData, {
        individualHooks: true,
        returning: true,
});


};