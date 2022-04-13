const Message = require('../models/Message');
const ResponseObject = require('../models/ResponseObject')
const Room = require('../models/Room')

class RoomController {

    async findAll(req, res) {
        try {
            await Room.find({}).then(data => {
                return res.status(200).json(ResponseObject(200, 'Find All Room Success', data));
            })
        } catch (e) {
            return res.json(ResponseObject(500, e.message))
        }
    }

    create(req, res) {
        try {
            console.log(req.body);
        } catch (e) {
            return res.json(ResponseObject(500, e.message))
        }
    }

    async findById(req, res) {
        try {
            const roomId = req.params.roomId;

            let countMessage = 0;

            await Message.find({ room: roomId })
                .then(data => {
                    countMessage = data.length;
                });

            const room = await Room.findById(roomId).populate('members', '_id email full_name avatar');

            if (!room) {
                return res.json(ResponseObject(404, 'Room Not Found'));
            }

            return res.status(200).json(ResponseObject(200, 'Find Room Success', {
                room,
                total_message: countMessage
            }));
        } catch (e) {
            return res.json(ResponseObject(500, e.message))
        }
    }

    update() {

    }

    delete() {

    }
}

module.exports = new RoomController();