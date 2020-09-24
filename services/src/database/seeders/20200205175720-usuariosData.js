'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('usuarios', 'usuarios_ibfk_1', {}).then(() => {
      return queryInterface.bulkInsert('usuarios',
        [
          { rol_id: 1, nombre: 'Admin', email: 'admin@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 1, nombre: 'Joshua VD', email: 'jvillena@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 2, nombre: 'Alberto Arana', email: 'aarana@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 2, nombre: 'Maria Alberca', email: 'malberca@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 7, nombre: 'Pablo Chacaltana', email: 'pchacaltana@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 7, nombre: 'Mirka Tamata', email: 'mtamata@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 7, nombre: 'Leopoldo Segura', email: 'lsegura@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 5, nombre: 'Alex Valdiviezo', email: 'avaldiviezo@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 8, nombre: 'Ronaldin Tarazona', email: 'rtarazona@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
          { rol_id: 1, nombre: 'Kevin ', email: 'laboratorio@vircatex.com', password: '$2a$10$wOYMi57wDkzPiPNaaReyj.W92pC6tPeuAtjoocQcuV6dUvLwKPW22' },
        ], {}).then(() => {
          return queryInterface.addConstraint('usuarios', ['rol_id'], {
            type: 'FOREIGN KEY',
            name: 'usuarios_ibfk_1',
            references: {
              table: 'roles',
              field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'restrict'
          });
        });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
