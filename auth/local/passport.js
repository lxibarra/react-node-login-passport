/**
 * After these methods are executed for authentication. The express-session wil create a cookie on the client
 * by setting the correct headers on the response.
 * Tutorial is here: https://github.com/passport/express-4.x-local-example/blob/master/server.js
 */

var passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    Users = require('../../models/users');

passport.use(new Strategy(
    function (username, password, cb) {
        Users.findOne({username: username, password:password}, function (err, user) {
            return cb(null, user);
        });
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    Users.findById(id, function(err, user) {
       if(err) { return cb(err); }
        cb(null, user);
    });
});

module.exports = passport;
