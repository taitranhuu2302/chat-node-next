const jwt = require('jsonwebtoken');
const ResponseObject = require('../models/ResponseObject');
class AuthController {

    async getToken(req, res) {
        if (req.user) {
            const data = {
                _id: req.user._id
            }

            const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' });
            await res.cookie("auth", token, {
                sameSite: "strict",
                path: "/",
                expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // 1000 * 60 * 60 * 24 -> 1 ngày
            })

            return res.redirect(process.env.URL_CLIENT);
        } else {
            return res.status(400).json(ResponseObject(400, 'Authentication failed!'))
        }
    }
}

module.exports = new AuthController();