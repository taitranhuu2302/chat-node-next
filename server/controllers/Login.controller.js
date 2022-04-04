const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ResponseObject = require('../models/ResponseObject');
class LoginController {

    getMe(req, res) {
        if (req.user) {
            return res.json(ResponseObject(200, 'Get Me Success', req.user));
        } else {
            return res.json(ResponseObject(403, 'Unauthorized'))
        }
    }
}

module.exports = new LoginController();