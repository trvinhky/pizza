'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Detail extends Model {
        static associate(models) {
            this.belongsTo(models.Product, {
                foreignKey: 'pro_Id',
                as: 'product'
            })

            this.belongsTo(models.Size, {
                foreignKey: 'size_Id',
                as: 'size'
            })
        }
    }
    Detail.init({
        pro_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        size_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        detail_price: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Detail',
        tableName: 'detail',
        timestamps: false
    });
    return Detail;
};
