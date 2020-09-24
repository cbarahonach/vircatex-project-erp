'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cotizaciones_textil", {
      cotizacion_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'cotizaciones',
          key: 'id'
        }
      },
      tipo: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: true,
      },
      articulo: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      color: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      titulo_tela: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      ancho_total: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      densidad_aw: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      densidad_bw: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      proveedor: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      revirado: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      encogimiento_largo: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      encogimiento_ancho: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      precio: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      largo_tizado_a: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      tolerancia: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      componente: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      eficiencia: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      largo_tizado_b: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      consumo_neto: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      merma_corte: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      deleted_status: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: true,
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
    return queryInterface.dropTable("cotizaciones_textil");
  }
};
