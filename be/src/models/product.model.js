'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            this.belongsToMany(models.Size, {
                through: models.Detail,
                foreignKey: 'pro_Id',
                otherKey: 'size_Id'
            })
        }
    }
    Product.init({
        pro_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        pro_name: DataTypes.STRING,
        pro_desc: DataTypes.TEXT,
        pro_url: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
    });
    return Product;
};
