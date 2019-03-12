'use strict';
module.exports = (sequelize, DataTypes) => {
  const short_url = sequelize.define('short_url', {
    title: DataTypes.STRING,
    shortUrl: DataTypes.TEXT,
    url: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  short_url.associate = function(models) {
    short_url.belongsTo(models.users, {foreignKey: "id"})
    short_url.hasMany(models.track_url, {foreignKey: "id"})
  };
  return short_url;
};