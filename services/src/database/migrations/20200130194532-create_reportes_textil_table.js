'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("reportes_textil", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      fabrica: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      cliente: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      fecha_creacion_po: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      po_buy: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      estilo: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      op: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      tintoreria: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      oc_tela: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      fecha_oc_tela: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      articulo: {
        type: Sequelize.DataTypes.STRING(510),
        allowNull: true
      },
      tela_principal_complemento: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      color: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      kg_prog: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      partida: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      fecha_hilado: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      fecha_tejido: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      fecha_tenhido: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      fecha_ta_planta: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      fecha_programada_auditoria: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      fecha_reprogramada_auditoria: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      fecha_despacho_real: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      kilos_despacho: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      dias_atraso: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      comentarios: {
        type: Sequelize.DataTypes.STRING(510),
        allowNull: true
      },
      situacion_actual: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      tipo_req: {
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("reportes_textil");
  }
};
