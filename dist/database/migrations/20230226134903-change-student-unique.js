"use strict";/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'students',
    'email',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  ),

  down: () => {},
};
