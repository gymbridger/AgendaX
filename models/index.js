const Date = require("./Date");
const Event = require("./Event");
const User = require("./User");

Date.hasMany(Event, {
  foreignKey: "event_id",
});

Event.belongsTo(Date, {
  foreignKey: "event_id",
});

User.hasMany(Date, {
  foreignKey: "user_id",
});

module.exports = { User, Event, Date };
