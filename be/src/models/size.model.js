'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        static associate(models) {
            this.belongsToMany(models.Product, {
                through: models.Detail,
                foreignKey: 'size_Id',
                otherKey: 'pro_Id'
            })
        }
    }
    Size.init({
        size_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        size_name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Size',
        tableName: 'sizes',
        timestamps: false,
    });
    return Size;
};
