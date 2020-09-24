'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('proveedores', [
      { id: 1 ,
        forma_pago_id : 1 ,
        moneda_id:1,
        razon_social:'EMPRESA DIEGO',
        ruc:'987654321',
        direccion:'Av.Lima',
        telefono:'947388451',
        banco_id: 1,
        num_cuenta: '98765431',
        num_cuenta_interbancaria:'987654321',
        correo:'dleguia@vircatex.com'        
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('proveedores', null, {});
  }
};
