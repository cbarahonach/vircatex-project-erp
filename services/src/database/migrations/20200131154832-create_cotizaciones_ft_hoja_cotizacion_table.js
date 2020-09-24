'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cotizaciones_ft_hoja_cotizacion', { 
      cotizacion_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'cotizaciones',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true
      },
      estilo_interno: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      proceso: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true
      },
      imagen1: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true
      },
      imagen2: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true
      },
      imagen3: {
        type: Sequelize.DataTypes.STRING(500),
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
    return queryInterface.dropTable('cotizaciones_ft_hoja_cotizacion');
  }
};
