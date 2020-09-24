'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      { nombre: 'Administrador' },
      { nombre: 'Comercial' },
      { nombre: 'Textil' },
      { nombre: 'Moldes' },
      { nombre: 'Logistica' },
      { nombre: 'Ingenieria' },
      { nombre: 'Gerencia' },
      { nombre: 'Externo' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
