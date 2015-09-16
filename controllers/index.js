var jade = require('jade');
var cookierParser = require('cookie-parser');
var sessions = require('../models/sessions');
var users = require('../models/users');
var mongoose = require('mongoose');
var config = require('../configuration/settings');

exports.get = function (req, res) {

    var cookies = req.cookies ? req.cookies : {cookies: 0};

    var decrypted = req.cookies.tokenizer ? cookierParser.signedCookie(req.cookies.tokenizer, config.appSecret) : false;
    if (typeof decrypted === 'string') {
        //lookup session
        sessions.findById(decrypted, function (err, session) {
            if (err) return res.status(500).send(err.toString());
            var userSession = JSON.parse(session.session);
            users.findById(mongoose.Types.ObjectId(userSession.passport.user), function(err, user) {
                if(err) return res.status(500).send(err);
                return res.render('index',  {
                    cookies: JSON.stringify(cookies, null, 2),
                    decrypted: decrypted,
                    userInfo:JSON.stringify(user, null, 2)
                });
            });
            //return res.render('index', {cookies: JSON.stringify(cookies, null, 2), decrypted: decrypted});
        });
    } else {
        return res.render('index', {cookies: JSON.stringify(cookies, null, 2), decrypted: decrypted});
    }

};


/*
fjH6yW2gr9j3gtHLpOvujIs9UoEso64k
fjH6yW2gr9j3gtHLpOvujIs9UoEso64k*/