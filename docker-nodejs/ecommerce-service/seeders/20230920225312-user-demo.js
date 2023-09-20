'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    
    let users = [
      {
        name: "user1",
        email: "user1@gmail.com",
        password: await bcrypt.hash("user1pw", 10),
        is_admin: false
      },
      {
        name: "user2",
        email: "user2@gmail.com",
        password: await bcrypt.hash("user2pw", 10),
        is_admin: false
      },
      {
        name: "user3",
        email: "user3@gmail.com",
        password: await bcrypt.hash("user3pw", 10),
        is_admin: false
      },
      {
        name: "user4",
        email: "user4@gmail.com",
        password: await bcrypt.hash("user4pw", 10),
        is_admin: false
      },
      {
        name: "user5",
        email: "user5@gmail.com",
        password: await bcrypt.hash("user5pw", 10),
        is_admin: false
      }
    ];

    return queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
