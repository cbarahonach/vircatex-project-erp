'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("proveedores", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      forma_pago_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'formas_pagos',
          key: 'id'
        }
      },
      moneda_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'monedas',
          key: 'id'
        }
      },
      razon_social: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      ruc: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      direccion: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      telefono: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      banco_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'bancos',
          key: 'id'
        }
      },
      num_cuenta: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      num_cuenta_interbancaria: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      correo: {
        type: Sequelize.DataTypes.STRING(100),
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
    return queryInterface.dropTable("proveedores");
  }
};
