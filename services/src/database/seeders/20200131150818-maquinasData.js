'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('maquinas', [
      { tipo: '3010', nombre: 'Costura Recta' },
      { tipo: '3020', nombre: 'Costura Recta 2 Agujas' },
      { tipo: '5040', nombre: 'Remalle Simple 1AG 3HL' },
      { tipo: '5140', nombre: 'Remalle Falsa Puntada 2AG 4HL' },
      { tipo: '4010', nombre: 'Recubierto Plano 1AG 3HL' },
      { tipo: '4063', nombre: 'Bastera 2AG 3HL' },
      { tipo: '4030', nombre: 'Tapetera 2AG 4HL' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('maquinas', null, {});
  }
};
