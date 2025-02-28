'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {

        }
    }
    Account.init({
        acc_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        acc_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        acc_password: DataTypes.STRING,
        acc_token: DataTypes.STRING,
        acc_name: DataTypes.STRING,
        acc_address: DataTypes.TEXT,
        acc_phone: DataTypes.STRING,
        acc_gender: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: true,
    });
    return Account;
};
