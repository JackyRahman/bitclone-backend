'use strict';
const Chance = require('chance')
const chance = new Chance()

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('track_urls', [{
      uuid:1,
      short_url_id:1,
      ip_address: chance.integer(),
      referrer_url: chance.string()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
