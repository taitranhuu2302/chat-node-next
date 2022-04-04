const mongoose = require('mongoose');
const ResponseObject = require('../models/ResponseObject');
const User = require('../models/User')

class UserController {

    async findAll(req, res) {
        try {
            await User.find({}, {password: 0})
                .then(data => {
                    return res.status(200).json(ResponseObject(200, "Find All User Success", data))
                })
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async addFriend(req, res) {

    }
}

module.exports = new UserController();