'use strict';
const Chance = require('chance')
const chance = new Chance

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkInsert('short_urls', [{
    
      title: chance.string(),
      shortUrl: chance.string(),
      url: chance.string(),
      userId:13
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
