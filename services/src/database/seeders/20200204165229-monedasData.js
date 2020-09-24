'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('monedas', [
      { codigo: 'USD', nombre: 'Dolar', codigo_moneda: '$' },
      { codigo: 'EUR', nombre: 'Euro', codigo_moneda: '€' },
      { codigo: 'PEN', nombre: 'Sol', codigo_moneda: 'S/' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('monedas', null, {});
  }
};