const Date = require("./Date");
const Event = require("./Event");
const User = require("./User");

Date.hasMany(Event);

module.exports = { User, Event, Date };
