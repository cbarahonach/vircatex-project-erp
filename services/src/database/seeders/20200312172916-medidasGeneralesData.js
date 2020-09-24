'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('medidas_generales', [
      { seccion_id: 1, nombre: '', abreviacion: '' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('medidas_generales', null, {});
  }
};
