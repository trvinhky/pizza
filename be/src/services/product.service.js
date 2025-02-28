const db = require("../models")

const ProductServices = {
    async create(product) {
        return await db.Product.create(product)
    },
    async getOne(pro_Id) {
        return await db.Product.findOne({
            where: { pro_Id }
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const title = params.title
        const where = {}

        if (title) {
            where.document_title = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        const check = {
            ...(Object.keys(where).length > 0 && { where }),
            distinct: true,
            order: [["createdAt", "DESC"]]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Product.findAndCountAll(check)
    },
}

module.exports = ProductServices