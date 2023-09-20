'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let date = new Date()
    let product_transaction = [
      {
       createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
       updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
       TransactionId: 1,
       ProductId: 1
      },
      {
        createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
        TransactionId: 1,
        ProductId: 2
      },
      {
        createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
        TransactionId: 1,
        ProductId: 3
      },
      {
        createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
        TransactionId: 2,
        ProductId: 1
       },
       {
         createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
         updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
         TransactionId: 2,
         ProductId: 5
       },
       {
        createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
         TransactionId: 3,
         ProductId: 3
       },
       {
        createdAt: date.toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
        TransactionId: 3,
        ProductId: 5
      }
    ];
    
    
    return queryInterface.bulkInsert('product_transaction', product_transaction, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('product_transaction', null, {});
  }
};
