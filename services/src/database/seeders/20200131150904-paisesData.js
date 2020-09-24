'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('paises', [
      { nombre: 'Brasil' },
      { nombre: 'Ecuador' },
      { nombre: 'Paraguay' },
      { nombre: 'Argentina' },
      { nombre: 'Uruguay' },
      { nombre: 'Chile' },
      { nombre: 'Venezuela' },
      { nombre: 'Bolivia' },
      { nombre: 'Colombia' },
      { nombre: 'Trinidad y Tobago' },
      { nombre: 'Guyana' },
      { nombre: 'Guyana Francesa' },
      { nombre: 'Surinam' },
      { nombre: 'Panamá' },
      { nombre: 'Costa Rica' },
      { nombre: 'El Salvador' },
      { nombre: 'Guatemala' },
      { nombre: 'Honduras' },
      { nombre: 'Belice' },
      { nombre: 'Nicaragua' },
      { nombre: 'Canadá' },
      { nombre: 'Estados Unidos' },
      { nombre: 'México' },
      { nombre: 'Rusia' },
      { nombre: 'España' },
      { nombre: 'Italia' },
      { nombre: 'Francia' },
      { nombre: 'Turquia' },
      { nombre: 'Alemania' },
      { nombre: 'Suecia' },
      { nombre: 'Portugal' },
      { nombre: 'Ucrania' },
      { nombre: 'Polonia' },
      { nombre: 'Noruega' },
      { nombre: 'Holanda' },
      { nombre: 'China' },
      { nombre: 'Japón' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('paises', null, {});
  }
};
