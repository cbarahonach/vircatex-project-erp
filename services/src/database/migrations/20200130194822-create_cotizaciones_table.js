'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cotizaciones', { 
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cliente_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        }
      },
      usuario_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      temporada_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'temporadas',
          key: 'id'
        }
      },
      codigo: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      estilo: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      tipo_tela: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      composicion_tela: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      complemento1: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: true
      },
      complemento2: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: true
      },
      complemento3: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: true
      }, 
      complemento4: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: true
      },
      tp_archivo: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: true
      },
      hm_archivo: {
        type: Sequelize.DataTypes.STRING(250),
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
      return queryInterface.dropTable('cotizaciones');
  }
};
