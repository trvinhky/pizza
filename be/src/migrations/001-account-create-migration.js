'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accounts', {
            acc_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            acc_email: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false
            },
            acc_password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            acc_token: {
                type: Sequelize.STRING,
                unique: true
            },
            acc_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            acc_address: {
                type: Sequelize.TEXT
            },
            acc_phone: {
                type: Sequelize.STRING,
            },
            acc_gender: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
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
        await queryInterface.dropTable('accounts')
    }
}