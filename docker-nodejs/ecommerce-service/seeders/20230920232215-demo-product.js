'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let products = [
      {
        name: "Bolso de mano",
        description: "Bolso de mano útil y cómodo",
        quantity: 3,
        status: "active",
        UserId: 3,
        CategoryId: 2
      },
      {
        name: "Smartphone",
        description: "Teléfono inteligente de última generación",
        quantity: 10,
        status: "active",
        UserId: 1,
        CategoryId: 1
      },
      {
        name: "Camiseta de algodón",
        description: "Camiseta de algodón suave y transpirable",
        quantity: 20,
        status: "active",
        UserId: 2,
        CategoryId: 3
      },
      {
        name: "Mesa de comedor",
        description: "Mesa de comedor elegante y resistente",
        quantity: 5,
        status: "active",
        UserId: 4,
        CategoryId: 4
      },
      {
        name: "Rompecabezas para niños",
        description: "Rompecabezas educativo para niños",
        quantity: 15,
        status: "active",
        UserId: 5,
        CategoryId: 5
      }
    ];
    
    
    return queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
