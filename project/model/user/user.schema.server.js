var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    roles: [{type: String, default: 'USER', enum: ['USER', 'CELEBRITY', 'ADMIN']}],
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "userProjectModel"}],
    following: [{type: mongoose.Schema.ObjectId, ref: "userProjectModel"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviewProjectModel"}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "postProjectModel"}],
    facebook: {
        id: String, token: String
    },
    google: {
        id: String, token: String
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: "movieUsers"});
module.exports = userSchema;