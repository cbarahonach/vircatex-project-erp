'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('volumenes', [
      { rango: '500 - 1000' },
      { rango: '1000 - 5000' },
      { rango: '5000 - 10000' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('volumenes', null, {});
  }
};
