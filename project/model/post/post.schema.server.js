var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    _author: {type: mongoose.Schema.ObjectId, ref: "userProjectModel"},
    dateUpdated: {type: Date, default: Date.now},
    name: String,
    post: {type: String, require: true}
}, {collection: "post"});

module.exports = postSchema;
