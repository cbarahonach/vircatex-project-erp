'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('formas_pagos', [
      { nombre: 'Contra entrega' },
      { nombre: 'Factura 7d' },
      { nombre: 'Factura 15d' },
      { nombre: 'Factura 30d' },
      { nombre: 'Letra 15d' },
      { nombre: 'Letra 30d' },
      { nombre: 'Letra 45d' },
      { nombre: 'Letra 60d' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('formas_pagos', null, {});
  }
};
