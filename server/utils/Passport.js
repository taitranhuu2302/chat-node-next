const passport = require('passport');
const User = require('../models/User.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById({_id: id}, {
        password: 0
    })
        .then(user => {
            done(null, user);
        })
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
        await User.findOne({googleId: profile.id})
            .then(async (data) => {
                if (data) {
                    done(null, data);
                } else {
                    const password = await bcrypt.hash('123123', 10);
                    new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        full_name: `${profile.name.familyName} ${profile.name.givenName}`,
                        password
                    }).save().then(user => done(null, user));
                }
            })
    }
));
