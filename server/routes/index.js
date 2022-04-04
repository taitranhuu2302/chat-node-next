const AuthRoute = require('./AuthRouter');
const RoomRoute = require('./RoomRouter')
const UserRoute = require('./UserRouter')

const routes = (app) => {
    app.use('/auth', AuthRoute);
    app.use('/api/room', RoomRoute);
    app.use('/api/user', UserRoute);
};

module.exports = routes;