const passport = require("passport");
const router = require('express').Router();
const LoginController = require('../controllers/AuthController');

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.get('/google/callback', passport.authenticate('google', {
    userProperty: 'user',
}), LoginController.getToken);

module.exports = router;