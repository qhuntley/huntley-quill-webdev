var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now},
    rating: {type: Number, default: 0}
}, {collection: "user"});
module.exports = userSchema;