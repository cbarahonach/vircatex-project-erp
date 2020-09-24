'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orden_compras_servicios", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false
      },
      tipo_orden: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        comment: '1 - OC 2 - OS'
      },
      proveedor_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'proveedores',
          key: 'id'
        }
      },
      programa: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      po: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      fecha_entrega: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      igv: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false
      },
      codigo_orden_compras: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        defaultValue: ''
      },
      codigo_orden_compras_servicios: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        defaultValue: ''
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
    return queryInterface.dropTable("orden_compras_servicios");
  }
};
