const ResponseObject = require('../models/ResponseObject');
const User = require('../models/User')
const Room = require('../models/Room')
const ROOM_TYPE = require('../constants/RoomType')
const Message = require('../models/Message')
const fs = require('fs');
const isBase64 = require('is-base64');
const path = require('path')

class UserController {

    async findAll(req, res) {
        try {
            await User.find({}, { password: 0 })
                .then(data => {
                    return res.status(200).json(ResponseObject(200, "Find All User Success", data))
                })
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async updateUser(req, res) {

        // body {
        //     full_name
        //     avatar
        //     address
        //     number_phone
        // }

        try {
            const { body } = req;
            const idUser = req.userId;

            const avatar = body.avatar;

            let nameAvatar = null;
            const base64 = avatar.split(';base64,').pop();
            const type = avatar.split(';')[0].split('/')[1];

            if (isBase64(base64)) {

                const newNameAvatar = `avatar-${idUser}.${type}`;
                nameAvatar = `http://localhost:${process.env.PORT}/images/` + newNameAvatar;
                // path.join(__dirname, "public")
                fs.writeFile(`public/images/${newNameAvatar}`, base64, { encoding: 'base64' }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File created');
                    }
                })
            }

            const updateUser = {
                full_name: body.full_name,
                avatar: nameAvatar ? nameAvatar : body.avatar,
                address: body.address,
                number_phone: body.number_phone
            }


            const user = await User.findByIdAndUpdate(idUser, body, { new: true });
            return res.status(200).json(ResponseObject(200, 'Update User Success', user));
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async findById(req, res) {
        try {
            await User.findById(req.userId, { password: 0 })
                .populate([
                    {
                        path: 'friends',
                        select: '_id email full_name avatar',
                    },
                    {
                        path: 'friend_pending',
                        select: '_id email full_name avatar',
                    },
                    {
                        path: 'rooms',
                        select: '_id name avatar room_type',
                        populate: [
                            {
                                path: 'owner',
                                select: '_id email full_name avatar',
                            },
                            {
                                path: 'members',
                                select: '_id email full_name avatar',
                            }
                        ],
                    }
                ])
                .then(data => {
                    return res.status(200).json(ResponseObject(200, "Find User By Id Success", data))
                })
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async addFriend(req, res) {
        // body {
        //     email
        // }

        try {
            const idUserCurrent = req.userId;
            const emailUserTo = req.body.email;

            const userTo = await User.findOne({
                email: emailUserTo
            });

            const userCurrent = await User.findById({ _id: idUserCurrent }, { _id: 1, email: 1, full_name: 1, avatar: 1 });

            const checkFriend = userTo.friends.findIndex(userId => userId.toString() === idUserCurrent);
            if (checkFriend !== -1) {
                return res.status(400).json(ResponseObject(400, "User is already your friend"))
            }

            const checkFriendPending = userTo.friend_pending.findIndex(userId => userId.toString() === idUserCurrent);
            if (checkFriendPending !== -1) {
                return res.status(400).json(ResponseObject(400, "You have already sent a friend request to this user"))
            }

            userTo.friend_pending.push(idUserCurrent);
            userTo.save();

            await req.io.in(userTo._id.toString()).emit('friend_pending', userCurrent);

            return res.status(200).json(ResponseObject(200, "Request Friend Success"))
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async findAllFriend(req, res) {
        try {
            const idUserCurrent = req.userId;
            await User.findOne({
                _id: idUserCurrent
            }).populate('friends', '_id email full_name avatar')
                .then(data => {
                    return res.status(200).json(ResponseObject(200, "Find All Friend Success", data.friends))
                });
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async findAllFriendPending(req, res) {
        try {
            const idUserCurrent = req.userId;
            await User.findOne({
                _id: idUserCurrent
            }).populate('friend_pending', '_id email full_name avatar').then(data => {
                return res.status(200).json(ResponseObject(200, "Find All Friend Pending Success", data.friend_pending))
            });
        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async acceptFriend(req, res) {
        // body {
        //     userId: (id)
        // }
        try {
            const idUserCurrent = req.userId;
            const idUserAccept = req.body.userId;

            const userCurrent = await User.findOne({
                _id: idUserCurrent,
                friend_pending: idUserAccept
            })

            const userAccept = await User.findOne({ _id: idUserAccept })

            if (!userCurrent || !userAccept) {
                return res.status(404).json(ResponseObject(404, "User Not Found"))
            }

            let room = new Room();
            room.members.push(idUserCurrent, idUserAccept);
            room.room_type = ROOM_TYPE.PRIVATE_ROOM;
            room.save();

            room = await Room.populate(room, { path: "members", select: "_id email full_name avatar" })

            userCurrent.friend_pending = userCurrent.friend_pending.filter(userId => userId.toString() !== idUserAccept)
            userCurrent.friends.push(idUserAccept)
            userCurrent.rooms.push(room)
            userCurrent.save();

            userAccept.friends.push(idUserCurrent)
            userAccept.rooms.push(room)
            userAccept.save();

            // socket emit
            await req.io.in(userAccept._id.toString()).emit('friend_accept', {
                user: userCurrent,
                room,
                message: `${userCurrent.full_name} has accepted the friend request`
            });

            await req.io.in(userCurrent._id.toString()).emit('friend_accept', {
                user: userAccept,
                room,
            });

            return res.status(200).json(ResponseObject(200, "Accept User Success"))

        } catch
        (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }

    async cancelFriendPending(req, res) {
        // body {
        //     userId: (id)
        // }
        try {
            const idUserCurrent = req.userId;
            const idUserCancel = req.body.userId;

            const userCurrent = await User.findOne({
                _id: idUserCurrent,
                friend_pending: idUserCancel
            })
            const userCancel = await User.findOne({ _id: idUserCancel })

            if (!userCurrent || !userCancel) {
                return res.status(404).json(ResponseObject(404, "User Not Found"))
            }

            userCurrent.friend_pending = userCurrent.friend_pending.filter(userId => userId.toString() !== idUserCancel)
            userCurrent.save();

            userCancel.friend_pending = userCancel.friend_pending.filter(userId => userId.toString() !== idUserCurrent)
            userCancel.save();

            return res.status(200).json(ResponseObject(200, "Cancel Friend Success"))

        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }

    }

    async cancelFriend(req, res) {
        // body {
        //     userId: (id)
        // }
        try {
            const idUserCurrent = req.userId;
            const idUserCancel = req.body.userId;

            const userCurrent = await User.findOne({
                _id: idUserCurrent,
                friends: idUserCancel
            })
            const userCancel = await User.findOne({ _id: idUserCancel })
            const roomPrivate = await Room.findOneAndDelete({ members: { $in: [idUserCurrent, idUserCancel] }, room_type: ROOM_TYPE.PRIVATE_ROOM })

            if (!userCurrent || !userCancel) {
                return res.status(404).json(ResponseObject(404, "User Not Found"))
            }

            userCurrent.friends = userCurrent.friends.filter(userId => userId.toString() !== idUserCancel)
            userCurrent.rooms = userCurrent.rooms.filter(roomId => roomId.toString() !== roomPrivate._id.toString())
            userCurrent.save();

            userCancel.friends = userCancel.friends.filter(userId => userId.toString() !== idUserCurrent)
            userCancel.rooms = userCancel.rooms.filter(roomId => roomId.toString() !== roomPrivate._id.toString())
            userCancel.save();

            await Message.deleteMany({ room: roomPrivate._id })

            return res.status(200).json(ResponseObject(200, "Cancel Friend Success"))

        } catch (e) {
            return res.status(500).json(ResponseObject(500, e.message))
        }
    }
}

module
    .exports = new UserController();