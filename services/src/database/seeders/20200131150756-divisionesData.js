'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('divisiones', [
      { nombre: 'Hombres' },
      { nombre: 'Mujeres' },
      { nombre: 'Niños' },
      { nombre: 'Bebes' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('divisiones', null, {});
  }
};
