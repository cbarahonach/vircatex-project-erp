'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("configuracion_sistema", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      igv: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: true,
      },
      nombre: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      ruc: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      direccion: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true,
      },
      telefono: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      logo: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      codigo_orden_compra: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      codigo_orden_servicio: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("configuracion_sistema");
  }
};
