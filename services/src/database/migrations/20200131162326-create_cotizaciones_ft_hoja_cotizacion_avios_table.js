'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cotizaciones_ft_hoja_cotizacion_avios', { 
      cotizacion_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'cotizaciones',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      consumo: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      unidad_medida: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
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
    return queryInterface.dropTable('cotizaciones_ft_hoja_cotizacion_avios');
  }
};
