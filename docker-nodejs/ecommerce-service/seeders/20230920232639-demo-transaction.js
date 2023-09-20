'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let transactions = [
      {
       UserId: 1
      },
      {
        UserId: 2
      },
      {
        UserId: 3
      },
    ];
    
    
    return queryInterface.bulkInsert('transactions', transactions, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
