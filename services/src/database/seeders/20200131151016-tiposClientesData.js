'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_clientes', [
      { nombre: 'Propio' },
      { nombre: 'Broker' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_clientes', null, {});
  }
};
