const ProductServices = require("../services/product.service")

const ProductControllers = {
    async create(req, res) {
        const {
            pro_name,
            pro_desc,
            pro_url
        } = req.body

        if (!pro_name || !pro_desc || !pro_url) {
            return res.errorValid()
        }

        try {

            const newProduct = await ProductServices.create(
                {
                    pro_name,
                    pro_desc,
                    pro_url: `uploads/${pro_url}`
                }
            )

            if (newProduct) {
                return res.successNoData(
                    'Thêm mới sản phẩm thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới sản phẩm thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id sản phẩm không tồn tại!'
            )
        }

        try {
            const product = await ProductServices.getOne(id)

            if (product) {
                return res.success(
                    'Lấy sản phẩm thành công!',
                    product
                )
            }

            return res.error(
                404,
                'Lấy sản phẩm thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, title } = req.query

        try {
            const products = await ProductServices.getAll({
                page, limit, title
            })

            if (products) {
                return res.success(
                    'Lấy tất cả sản phẩm thành công!',
                    {
                        count: products.count,
                        products: products.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả sản phẩm thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = ProductControllers