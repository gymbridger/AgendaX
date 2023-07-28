const Date = require("./Date");
const Event = require("./Event");
const User = require("./User");

Date.hasMany(Event, {
  foreignKey: "event_id",
});

Event.belongsTo(Date, {
  foreignKey: "event_id",
});

module.exports = { User, Event, Date };
