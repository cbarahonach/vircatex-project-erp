'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("clientes", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      pais_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'paises',
          key: 'id'
        }
      },
      tc_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'tipos_clientes',
          key: 'id'
        }
      },
      division_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'divisiones',
          key: 'id'
        }
      },
      volumen_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'volumenes',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      contacto_nombre: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },
      contacto_email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },
      contacto_telefono: {
        type: Sequelize.DataTypes.STRING(100),
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
    return queryInterface.dropTable("clientes");
  }
};
