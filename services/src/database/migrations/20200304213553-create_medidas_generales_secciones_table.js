'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("medidas_generales_secciones", {
            id: {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            modulo: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false
            },
            seccion: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false
            },
            descripcion: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false
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
        return queryInterface.dropTable("medidas_generales_secciones");
    }
};
