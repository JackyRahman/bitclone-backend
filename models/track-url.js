'use strict';
module.exports = (sequelize, DataTypes) => {
  const track - url = sequelize.define('track-url', {
    uuid: DataTypes.STRING,
    short_url_id: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    referrer_url: DataTypes.STRING
  }, {});
  track - url.associate = function(models) {
    // associations can be defined here
  };
  return track - url;
};