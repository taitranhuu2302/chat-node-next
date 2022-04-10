const socket = (io) => {
    io.on("connection", (socket) => {
        socket.on('user_connected', ({ rooms, _id }) => {
            console.log(rooms, _id)
            socket.join(_id);
            rooms.forEach(room => {
                socket.join(room._id);
            })
        })
    });
};

module.exports = socket;