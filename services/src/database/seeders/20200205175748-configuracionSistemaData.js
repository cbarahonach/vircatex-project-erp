'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('configuracion_sistema', [
      { id: 1 ,
        igv : 0.18 ,
        nombre:'VIRCATEX INTERNATIONAL TRADING S.A.C',
        ruc:'20603603550',
        direccion:'CALLE NUGGET 386, AGUSTINO, LIMA',
        telefono:'01 6358145',
        logo:'http://vircatex.com/dashboard/firma.jpg',
        codigo_orden_compra:300,
        codigo_orden_servicio: 300
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('configuracion_sistema', null, {});
  }
};
