'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let categories = [
      {
        name: "Electrónica",
        description: "Productos electrónicos"
      },
      {
        name: "Ropa",
        description: "Prendas de vestir"
      },
      {
        name: "Alimentación",
        description: "Productos alimenticios"
      },
      {
        name: "Muebles",
        description: "Mobiliario para el hogar"
      },
      {
        name: "Juguetes",
        description: "Juguetes para todas las edades"
      }
    ];
    
    return queryInterface.bulkInsert('categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
