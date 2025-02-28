const jwt = require('jsonwebtoken')

const AuthMiddlewares = {
    verifyToken(req, res, next) {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({
            message: 'Token không tồn tại!'
        })

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Token không hợp lệ!'
                    })
                }

                req.acc_Id = data.acc_Id
                next();
            }
        );
    }
}

module.exports = AuthMiddlewares 