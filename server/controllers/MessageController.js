const Message = require('../models/Message');
const ResponseObject = require('../models/ResponseObject');

class MessageController {

    async findByRoomId(req, res) {
        const limit = req.query.limit || 10;

        try {
            await Message.find({ room: req.params.roomId })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('owner', '_id email full_name avatar')
                .then(data => {
                    return res.status(200)
                        .json(ResponseObject(200, 'Find Message By Room Id Success', data));
                });
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async sendMessage(req, res) {
        try {
            const roomId = req.params.roomId;
            const body = req.body;
            const message = new Message(body);

            message.owner = req.userId;
            message.room = roomId;
            message.save();
            return res.status(200).json(ResponseObject(200, 'Send Message Success', message));
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }

    }
}

module.exports = new MessageController();