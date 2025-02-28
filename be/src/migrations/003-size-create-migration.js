'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('sizes', {
            size_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            size_name: {
                type: Sequelize.STRING(500),
                allowNull: false
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('sizes')
    }
}