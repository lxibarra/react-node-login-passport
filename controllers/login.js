var User = require('../models/users');

exports.success = function (req, res) {
    res.status(200).send('All done authentication success');
};

exports.create = function(req, res) {

    if(req.body.username && req.body.password) {
        var user = new User({ username:req.body.username, password:req.body.password });
        user.save(function(err, newUser) {
            if(err) return res.status(500).send('Unable to save record');
            if(newUser) return res.status(201).json(newUser);
        });
    } else {
      return res.status(500).send('Invalid data and unable to save records');
    }
};