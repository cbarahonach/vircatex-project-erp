'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('modulos_rutas', 'modulos_rutas_ibfk_1', {}).then(() => {
      return queryInterface.bulkInsert('modulos_rutas',
        [
          { modulo_id: 1, nombre: 'Registrar Cliente', ruta: 'registrar-cliente' },
          { modulo_id: 1, nombre: 'Listado de Clientes', ruta: 'listado-clientes'},
          { modulo_id: 1, nombre: 'Solicitud de Cotización', ruta: 'solicitud-cotizacion' },
          { modulo_id: 1, nombre: 'Ejecución de Cotización', ruta: 'ejecucion-cotizacion' },
          { modulo_id: 2, nombre: 'Reporte Textil', ruta: 'reporte-textil' },
          { modulo_id: 2, nombre: 'Reporte Manufactura', ruta: 'reporte-manufactura' },
          { modulo_id: 3, nombre: 'Registrar Usuario', ruta: 'registrar-usuario' },
          { modulo_id: 3, nombre: 'Registrar Modulo', ruta: 'registrar-modulo' },
          { modulo_id: 3, nombre: 'Registrar Accesos', ruta: 'registrar-acceso' },
          { modulo_id: 4, nombre: 'Asistencias', ruta: 'asistencias' },
          { modulo_id: 4, nombre: 'Registrar Personal', ruta: 'registrar-personal' },
          { modulo_id: 5, nombre: 'Registrar Orden de Compra', ruta: 'registrar-orden-compra' },
          { modulo_id: 5, nombre: 'Registrar Proveedor', ruta: 'registrar-proveedor' },
          { modulo_id: 5, nombre: 'Listado de Ordenes de Compra', ruta: 'listado-orden-compra'},
          { modulo_id: 5, nombre: 'Listado de Proveedores', ruta: 'listado-proveedores'}
        ], {}).then(() => {
          return queryInterface.addConstraint('modulos_rutas', ['modulo_id'], {
            type: 'FOREIGN KEY',
            name: 'modulos_rutas_ibfk_1',
            references: {
              table: 'modulos',
              field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'restrict'
          });
        });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modulos_rutas', null, {});
  }
};
