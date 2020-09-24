'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('temporadas', [
      { nombre: 'Fall' },
      { nombre: 'Spring' },
      { nombre: 'Summer' },
      { nombre: 'Winter' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('temporadas', null, {});
  }
};
