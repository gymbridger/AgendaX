const Event = require("./Event");
const User = require("./User");

// 1 user has many events
User.hasMany(Event, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// an event belongs to 1 user
Event.belongsTo(User, {
  foreignKey: "user_id",
});

// many dates belong to 1 user instance. this is a many to one relationship
Date.belongsTo(User, {
  foreignKey: "user_id",
});

Event.hasMany(Date, {
  foreignKey: "date_id",
});

Event.hasMany(User, {
  foreignKey: "date_id",
});

module.exports = { Event, Date, User };

// When we use "hasMany", we set a foreign key in the "many" model to link back to the "one" model.
