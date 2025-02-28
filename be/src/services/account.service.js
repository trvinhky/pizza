const db = require("../models")

const AccountServices = {
    async create(account) {
        return await db.Account.create(account)
    },
    async getOne(params, isPassword = false) {
        return await db.Account.findOne({
            where: params,
            attributes: { exclude: !isPassword ? ['account_password'] : [] }
        })
    },
    async logout(acc_Id) {
        const account = await db.Account.findOne({ where: { acc_Id } })
        if (account) {
            account.acc_token = null
            return await account.save()
        }
        return null
    },
    async update(data, params, transaction) {
        const acc_Id = params.acc_Id
        const where = {}
        const { acc_name, acc_address, acc_phone, acc_gender } = data

        if (acc_Id) where.acc_Id = acc_Id
        const account = {}

        if (typeof acc_name !== 'undefined') {
            account.acc_name = acc_name
        }

        if (typeof acc_address !== 'undefined') {
            account.acc_address = acc_address
        }

        if (typeof acc_phone !== 'undefined') {
            account.acc_phone = acc_phone
        }

        if (typeof acc_gender !== 'undefined') {
            account.acc_gender = acc_gender
        }

        await db.Account.update(
            account,
            { where },
            transaction
        )

        return await db.Account.findOne({
            where,
            transaction
        })
    },
}

module.exports = AccountServices