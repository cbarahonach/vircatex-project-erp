'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("avios_familia", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      abreviacion: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
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
    return queryInterface.dropTable("avios_familia");
  }
};