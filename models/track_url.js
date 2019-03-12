'use strict';
module.exports = (sequelize, DataTypes) => {
  const track_url = sequelize.define('track_url', {
    uuid: DataTypes.STRING,
    short_url_id: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    referrer_url: DataTypes.STRING
  }, {});
  track_url.associate = function(models) {
    track_url.belongsTo(models.short_url, {foreignKey: "id"})
  };
  return track_url;
};