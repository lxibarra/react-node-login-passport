var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    _id:String,
    session:String,
    expires:Date
});

var Session = mongoose.model('session', sessionSchema);

module.exports = Session;