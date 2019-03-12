'use strict';
const Chance = require ('chance')
const chance = new Chance()

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('users',[{
      email: chance.string(),
      password: chance.string()
    }
    ],{})

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
