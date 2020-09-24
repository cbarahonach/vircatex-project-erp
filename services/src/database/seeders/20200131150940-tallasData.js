'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tallas', [
      { medida: '1' },
      { medida: '2' },
      { medida: '3' },
      { medida: '4' },
      { medida: '5' },
      { medida: '6' },
      { medida: '7' },
      { medida: '8' },
      { medida: '9' },
      { medida: '10' },
      { medida: '11' },
      { medida: '12' },
      { medida: '13' },
      { medida: '14' },
      { medida: '15' },
      { medida: '16' },
      { medida: 'XXS' },
      { medida: 'XS' },
      { medida: 'S' },
      { medida: 'M' },
      { medida: 'L' },
      { medida: 'XL' },
      { medida: 'XXL' },
      { medida: 'XXXL' },
      { medida: '36' },
      { medida: '38' },
      { medida: '40' },
      { medida: '42' },
      { medida: '44' },
      { medida: '46' },
      { medida: '48' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tallas', null, {});
  }
};
