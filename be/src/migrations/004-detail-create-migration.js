'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detail', {
            pro_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'products',
                    key: 'pro_Id'
                }
            },
            size_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'sizes',
                    key: 'size_Id'
                }
            },
            detail_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('detail')
    }
}