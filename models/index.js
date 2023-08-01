const Event = require("./Event");
const User = require("./User");

// 1 user has many events
User.hasMany(Event, {
  foreignKey: "user_id",
});

// an event belongs to 1 user
Event.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Event };

// When we use "hasMany", we set a foreign key in the "many" model to link back to the "one" model.
