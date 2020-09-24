'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("avios", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      avios_familia_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'avios_familia',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      construccion: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      color: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      dimensiones: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      gramaje_densidad: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      elongacion: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      impresion_disenho: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      caracteristicas_ht: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      tipo: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      caracteristicas_bolsa: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      caracteristicas_cierre: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      descripcion_libre: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      lt: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
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
    return queryInterface.dropTable("avios");
  }
};
