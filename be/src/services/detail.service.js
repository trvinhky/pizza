const db = require("../models")

const DetailServices = {
    async create(detail) {
        return await db.Detail.create(detail)
    },
    async getOne(pro_Id, size_Id) {
        return await db.Detail.findOne({
            where: { pro_Id, size_Id },
            include: [
                {
                    model: db.Product,
                    as: 'product'
                },
                {
                    model: db.Size,
                    as: 'size'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const pro_Id = params.pro
        const size_Id = params.size
        const title = params.title
        const name = params.name
        const order = params.order;// sắp xếp giảm dần

        const where = {}
        const orderCheck = [];

        if (pro_Id) where.pro_Id = pro_Id
        if (size_Id) where.size_Id = size_Id

        const whereSub = {}
        const wherePro = {}

        if (name) {
            whereSub.size_name = {
                [db.Sequelize.Op.like]: `%${name}%`
            }
        }

        if (title) {
            wherePro.pro_name = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        if (["desc", "asc"].includes(order)) {
            orderCheck.push(["detail_price", order.toUpperCase()]);
        } else {
            orderCheck.push(["detail_price", "DESC"]);
        }

        const roleObj = {
            ...(Object.keys(where).length > 0 && { where }),
            distinct: true,
            include: [
                {
                    model: db.Size,
                    as: 'size',
                    ...(Object.keys(whereSub).length > 0 && { where: whereSub }),
                },
                {
                    model: db.Product,
                    as: 'product',
                    ...(Object.keys(wherePro).length > 0 && { where: wherePro }),
                }
            ],
            distinct: true,
            order: [orderCheck]
        }

        if (page) {
            roleObj.limit = limit
            roleObj.offset = offset
        }

        return await db.Detail.findAndCountAll(roleObj)
    }
}

module.exports = DetailServices