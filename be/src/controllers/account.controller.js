const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const AccountServices = require("../services/account.service")
const AuthServices = require("../services/auth.service")

const AccountControllers = {
    async create(req, res) {
        const { password, email, address, name, phone, gender } = req.body

        if (!password || !email || !name || !address || !phone || typeof gender === 'undefined') {
            return res.errorValid()
        }

        try {
            const hashedPassword = await bcrypt.hash(password, +process.env.SALT)

            const data = {
                acc_email: email,
                acc_password: hashedPassword,
                acc_name: name,
                acc_address: address,
                acc_phone: phone,
                acc_gender: typeof gender === 'undefined' ? 0 : +(gender),
            }

            const newAccount = await AccountServices.create(data)

            if (newAccount) {
                return res.successNoData('Thêm mới người dùng thành công!')
            }

            return res.error(404, 'Thêm mới người dùng thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async login(req, res) {
        const { password, email } = req.body

        if (!password || !email) {
            return res.errorValid()
        }

        try {
            const account = await AccountServices.getOne({ acc_email: email }, true)

            if (account && (await bcrypt.compare(password, account.acc_password))) {
                const refreshToken = AuthServices.generateRefreshToken(account)
                const accessToken = AuthServices.generateAccessToken(account)

                account.acc_token = refreshToken
                await account.save()

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // Thời hạn cookie (7 ngày)
                });

                return res.success(
                    'Đăng nhập thành công!',
                    { token: accessToken }
                )
            }

            return res.error(404, 'Email hoặc mật khẩu không khớp!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async logout(req, res) {
        const { acc_Id } = req

        if (!acc_Id) {
            return res.errorValid('Id người dùng không tồn tại!')
        }

        try {
            const account = await AccountServices.logout(acc_Id)

            if (account) {
                return res.successNoData('Đăng xuất thành công!')
            }

            return res.error(404, 'refresh token không tồn tại!')
        } catch (error) {
            console.log(error)
            return res.errorServer()
        }
    },
    async updateAccessToken(req, res) {
        const refreshToken = req?.cookies?.refreshToken

        if (!refreshToken) {
            return res.error(404, 'Refresh token chưa được cấp!')
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, data) => {
                if (err || !data) {
                    return res.error(404, 'Refresh token không tồn tại!')
                }
                try {
                    const accessToken = AuthServices.generateAccessToken(data)
                    const refreshToken = AuthServices.generateRefreshToken(data)

                    const account = await AccountServices.getOne({ acc_Id: data?.acc_Id })
                    account.acc_token = refreshToken
                    await account.save()
                    if (account) {
                        return res.success(
                            'Cập nhật token thành công!',
                            {
                                token: accessToken
                            }
                        )
                    }

                    return res.error(404, 'Cập nhật token thất bại!')
                } catch (e) {
                    return res.errorServer()
                }
            }
        );
    },
    async getOne(req, res) {
        const { acc_Id } = req

        if (!acc_Id) {
            return res.errorValid('Id tài khoản không tồn tại!')
        }

        try {
            const account = await AccountServices.getOne({ acc_Id })

            if (account) {
                return res.success(
                    'Lấy thông tin tài khoản thành công!',
                    account
                )
            }

            return res.error(404, 'Lấy thông tin tài khoản thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { acc_address, acc_phone, acc_gender, acc_name } = req.body
        const { acc_Id } = req

        if (!acc_Id) {
            return res.errorValid(
                'Không tồn tại account_Id!'
            )
        }

        try {
            const data = {}
            if (typeof acc_gender !== 'undefined') {
                data.acc_gender = +acc_gender
            }

            if (typeof acc_address !== 'undefined') {
                data.acc_address = acc_address
            }

            if (typeof acc_phone !== 'undefined') {
                data.acc_phone = acc_phone
            }

            if (typeof acc_name !== 'undefined') {
                data.acc_name = acc_name
            }

            const account = await AccountServices.update(
                data,
                { acc_Id },
                transaction
            )

            if (account) {
                return res.successNoData('Thay đổi thông tin thành công!')
            }

            return res.error(404, 'Thay đổi thông tin thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = AccountControllers