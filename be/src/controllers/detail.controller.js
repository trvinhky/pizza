const DetailServices = require("../services/detail.service")

const DetailControllers = {
    async create(req, res) {
        const {
            pro_Id,
            size_Id,
            detail_price
        } = req.body

        if (!pro_Id || !size_Id || isNaN(+detail_price)) {
            return res.errorValid()
        }

        try {

            const newDetail = await DetailServices.create(
                {
                    pro_Id,
                    size_Id,
                    detail_price: +detail_price
                }
            )

            if (newDetail) {
                return res.successNoData(
                    'Thêm mới chi tiết thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới chi tiết thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, title, pro, size, order } = req.query

        try {
            const details = await DetailServices.getAll({
                page, limit, title, pro, size, order
            })

            if (details) {
                return res.success(
                    'Lấy tất cả chi tiết thành công!',
                    {
                        count: details.count,
                        details: details.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả chi tiết thất bại!'
            )
        } catch (err) {
            console.log(err)
            return res.errorServer()
        }
    },
}

module.exports = DetailControllers