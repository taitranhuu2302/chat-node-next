const { GROUP_ROOM } = require('../constants/RoomType');
const Message = require('../models/Message');
const ResponseObject = require('../models/ResponseObject')
const Room = require('../models/Room')
const User = require('../models/User')

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

    async create(req, res) {
        try {
            const { members, name } = req.body;

            const memberList = [...members, req.userId];

            let newRoom = new Room();
            newRoom.name = name;
            newRoom.members = memberList;
            newRoom.owner = req.userId;
            newRoom.room_type = GROUP_ROOM;
            newRoom.save();

            newRoom = await Room.populate(newRoom, [
                { path: 'members', select: '_id email full_name avatar' },
                { path: 'owner', select: '_id email full_name avatar' }
            ]);

            await User.updateMany({ _id: { $in: newRoom.members } }, { $push: { rooms: newRoom._id } });

            await memberList.forEach((u) => {
                req.io.in(u).emit('new_room', newRoom);
            });

            return res.status(200).json(ResponseObject(200, 'Create Room Success', newRoom));

        } catch (e) {
            return res.json(ResponseObject(500, e.message))
        }
    }

    async leaveRoom(req, res) {
        try {
            const roomId = req.params.roomId;
            const userId = req.userId;

            const room = await Room.findOne({ _id: roomId }).populate([
                { path: 'members', select: '_id email full_name avatar' },
                { path: 'owner', select: '_id email full_name avatar' }
            ]);

            if (!room) {
                return res.status(404).json(ResponseObject(404, 'Room Not Found'));
            }

            if (room.owner._id.toString() === userId) {
                await User.updateMany({ rooms: roomId }, { $pull: { rooms: roomId } });
                await Message.deleteMany({ room: roomId });
                await Room.findByIdAndDelete(roomId);

                await req.io.in(room._id.toString()).emit('delete_room', room);

                return res.status(200).json(ResponseObject(200, 'Delete Room Success'));
            }

            const index = room.members.indexOf(userId);

            if (index > -1) {
                room.members.splice(index, 1);
                room.save();
            }

            const user = await User.findByIdAndUpdate({ _id: userId }, { $pull: { rooms: roomId } }, { new: true });

            // await req.io.in(room._id.toString()).emit('leave_room', {
            //     message: user.full_name + ' đã rời khỏi phòng',
            // });
            console.log(user)

            await req.io.in(room._id.toString()).emit('leave_room', {
                user: user,
                roomId: room._id.toString()
            });


            return res.status(200).json(ResponseObject(200, 'Leave Room Success'));
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
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
