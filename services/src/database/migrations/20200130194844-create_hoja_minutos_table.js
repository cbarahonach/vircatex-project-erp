'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hoja_minutos', { 
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      analista: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      fecha: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      po: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      tipo_prenda: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      tela_cuerpo_1: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      tela_cuerpo_2: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      artes: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      acabados: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      tallas: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      jornada: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      operarios: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      eficiencia: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      quiero_sacar: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true
      }, 
      si_tengo: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true
      },
      tpo_corte: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      tpo_acabados: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      cotizacion_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        refereces: {
          model: 'cotizaciones',
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
    return queryInterface.dropTable('hoja_minutos');
  }
};
