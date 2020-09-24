'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('medidas_generales_secciones', [
      { modulo: 'Logistica', seccion: 'Registrar Orden de Compra', descripcion: 'Form: agregar items' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('medidas_generales_secciones', null, {});
  }
};
