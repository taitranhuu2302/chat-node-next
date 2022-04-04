const AuthRoute = require('./Auth.router');

const routes = (app) => {
    app.use('/auth', AuthRoute);
};

module.exports = routes;