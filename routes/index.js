var express = require('express'),
    index = require('../controllers/index'),
    login = require('../controllers/login'),
    passport = require('../auth/local/passport');

exports.router = function (app) {
    app.use('/public', express.static('./public'));

    app.get('/', index.get);

    app.post('/api/create', login.create);

    app.post('/api/login', passport.authenticate('local', { failureRedirect:'/resubmit' }), login.success);

    app.all('*', function(req, res) {
        return res.status(404).send('Resource not found');
    });
};