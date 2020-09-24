'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('rutas_roles', 'rutas_roles_ibfk_1', {}).then(() => {
      return queryInterface.removeConstraint('rutas_roles', 'rutas_roles_ibfk_2', {}).then(() => {
        return queryInterface.bulkInsert('rutas_roles',
          [
            { rol_id: 1, ruta_id: 1, },
            { rol_id: 1, ruta_id: 2, },
            { rol_id: 1, ruta_id: 3, },
            { rol_id: 1, ruta_id: 4, },
            { rol_id: 1, ruta_id: 5, },
            { rol_id: 1, ruta_id: 6, },
            { rol_id: 1, ruta_id: 7, },
            { rol_id: 1, ruta_id: 8, },
            { rol_id: 1, ruta_id: 9, },
            { rol_id: 1, ruta_id: 10, },
            { rol_id: 1, ruta_id: 11, },
            { rol_id: 1, ruta_id: 12, },
            { rol_id: 1, ruta_id: 13, },
            { rol_id: 1, ruta_id: 14, },
            { rol_id: 2, ruta_id: 1, },
            { rol_id: 2, ruta_id: 2, },
            { rol_id: 2, ruta_id: 3, },
            { rol_id: 3, ruta_id: 3, },
            { rol_id: 1, ruta_id: 15, },
            { rol_id: 5, ruta_id: 12, },
            { rol_id: 5, ruta_id: 13, },
            { rol_id: 5, ruta_id: 14, },
            { rol_id: 5, ruta_id: 15, },
            { rol_id: 2, ruta_id: 12, },
            { rol_id: 2, ruta_id: 4, },
            { rol_id: 2, ruta_id: 13, },
            { rol_id: 2, ruta_id: 14, },
            { rol_id: 2, ruta_id: 15, },
            { rol_id: 8, ruta_id: 5, },
            { rol_id: 8, ruta_id: 6, },
            { rol_id: 8, ruta_id: 12, },
            { rol_id: 8, ruta_id: 14, },
            { rol_id: 8, ruta_id: 15, },
            { rol_id: 7, ruta_id: 1, },
            { rol_id: 7, ruta_id: 2, },
            { rol_id: 7, ruta_id: 3, },
            { rol_id: 7, ruta_id: 4, },
            { rol_id: 7, ruta_id: 5, },
            { rol_id: 7, ruta_id: 6, },
            { rol_id: 7, ruta_id: 12, },
            { rol_id: 7, ruta_id: 13, },
            { rol_id: 7, ruta_id: 14, },
            { rol_id: 7, ruta_id: 15, },
            

          ], {}).then(() => {
            return queryInterface.addConstraint('rutas_roles', ['rol_id'], {
              type: 'FOREIGN KEY',
              name: 'rutas_roles_ibfk_1',
              references: {
                table: 'roles',
                field: 'id'
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }).then(() => {
              return queryInterface.addConstraint('rutas_roles', ['ruta_id'], {
                type: 'FOREIGN KEY',
                name: 'rutas_roles_ibfk_2',
                references: {
                  table: 'modulos_rutas',
                  field: 'id'
                },
                onDelete: 'restrict',
                onUpdate: 'restrict'
              });
            });
          });
      })

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modulos_rutas', null, {});
  }
};
