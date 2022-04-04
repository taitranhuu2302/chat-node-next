const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ResponseObject = require('../models/ResponseObject');
class AuthController {

    getMe(req, res) {
        if (req.user) {
            const data = {
                _id: req.user._id
            }
            const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1d'});

            return res.json(ResponseObject(200, 'Get Me Success', token));

        } else {
            return res.json(ResponseObject(403, 'Unauthorized'))
        }
    }
}

module.exports = new AuthController();