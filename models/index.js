const Date = require("./Date");
const Event = require("./Event");
const User = require("./User");

// 1 date instance has many events. this is a one to many relationship
Date.hasMany(Event, {
  foreignKey: "date_id",
});

// many events belong to 1 date instance. this is a many to one relationship
Event.belongsTo(Date, {
  foreignKey: "date_id",
});

// 1 user instance has many dates. this is a one to many relationship
User.hasMany(Date, {
  foreignKey: "user_id",
});

// many dates belong to 1 user instance. this is a many to one relationship
Date.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Event, Date };

// When we use "hasMany", we set a foreign key in the "many" model to link back to the "one" model.
