'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bancos', [
      { nombre: 'N/A' },
      { nombre: 'BBVA Continental' },
      { nombre: 'Banco de credito del Perú' },
      { nombre: 'Interbank' },
      { nombre: 'Scotiabank' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bancos', null, {});
  }
};
