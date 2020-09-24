'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("personal", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nombres: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      area: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      hora_ingreso: {
        type: 'TIME',
        allowNull: false,
      },
      hora_salida: {
        type: 'TIME',
        allowNull: false,
      },
      deleted_status: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: true
      },
      deleted_at: {
        type: 'TIMESTAMP',
        allowNull: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("personal");
  }
};
