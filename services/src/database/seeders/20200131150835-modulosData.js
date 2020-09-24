'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('modulos', [
      { nombre: 'Comercial', ruta: 'Comercial' },
      { nombre: 'Externo', ruta: 'Externo' },
      { nombre: 'Sistemas', ruta: 'Sistemas' },
      { nombre: 'Administracion', ruta: 'Administracion' },
      { nombre: 'Logistica', ruta: 'Logistica'}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modulos', null, {});
  }
};
