'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hoja_minutos_operaciones', { 
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      bloque: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      operacion: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      ts: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      cat: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      id_maquina: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'maquinas',
          key: 'id'
        }
      },
      id_hoja_minutos: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'hoja_minutos',
          key: 'id'
        }
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('hoja_minutos_operaciones');
  }
};
