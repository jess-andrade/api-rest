"use strict";/** @type {import('sequelize-cli').Migration} */
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'People',
    [
      {
        name: 'Jessica',
        email: 'jess123@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jessica2',
        email: 'jess456@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jessica3',
        email: 'jess789@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
