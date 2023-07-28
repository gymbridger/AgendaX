const Date = require("./Date");

Date.hasMany(Painting, {
  foreignKey: "gallery_id",
});

Painting.belongsTo(Gallery, {
  foreignKey: "gallery_id",
});

module.exports = { User, Gallery, Painting };
