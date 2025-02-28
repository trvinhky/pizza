const SizeServices = require("../services/size.service")

const SizeControllers = {
    async create(req, res) {
        const {
            size_name
        } = req.body
        if (!size_name) {
            return res.errorValid(
                'Tên kích cỡ không tồn tại!'
            )
        }

        try {
            const newSize = await SizeServices.create({
                size_name
            })

            if (newSize) {
                return res.successNoData(
                    'Thêm mới kích cỡ thành công!'
                )
            }

            return res.error(404, 'Thêm mới kích cỡ thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id kích cỡ không tồn tại!'
            )
        }

        try {
            const size = await SizeServices.getOne(id)

            if (size) {
                return res.success(
                    'Lấy kích cỡ thành công!',
                    size
                )
            }

            return res.error(404, 'Lấy kích cỡ thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const sizes = await SizeServices.getAll({
                page, limit
            })

            if (sizes) {
                return res.success(
                    'Lấy tất cả kích cỡ thành công!',
                    {
                        count: sizes.count,
                        sizes: sizes.rows
                    }
                )
            }

            return res.error(404, 'Lấy tất cả kích cỡ thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = SizeControllers