const jwt = require('jsonwebtoken')

const AuthServices = {
    generateAccessToken(payload) {
        const { acc_Id } = payload

        return jwt.sign(
            { acc_Id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d' /* 15m */
            }
        )
    },
    generateRefreshToken(payload) {
        const { acc_Id } = payload

        return jwt.sign(
            { acc_Id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        )
    }
}

module.exports = AuthServices