const sequelize = require('../config/connection');
const {User, Event, Date} = require('../models');

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
    await Date.bulkCreate(dateData, {
    individualHooks: true,
    returning: true,

});
};