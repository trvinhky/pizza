const db = require("../models")

const SizeServices = {
    async create(size) {
        return await db.Size.create(size)
    },
    async getOne(size_Id) {
        return await db.Size.findOne({
            where: { size_Id },
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        const check = {
            distinct: true,
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Size.findAndCountAll(check)
    }
}

module.exports = SizeServices