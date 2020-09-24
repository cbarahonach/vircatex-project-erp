'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orden_compras_items", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      orden_compra_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'orden_compras_servicios',
          key: 'id'
        }
      },
      item: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      concepto: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
      },
      unidad_medida: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      precio_unitario: {
        type: Sequelize.DataTypes.DOUBLE,
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
    return queryInterface.dropTable("orden_compras_items");
  }
};
