'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            pro_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            pro_name: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false
            },
            pro_desc: {
                type: Sequelize.TEXT
            },
            pro_url: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products')
    }
}