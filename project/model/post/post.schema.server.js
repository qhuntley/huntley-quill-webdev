var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    _author: {type: mongoose.Schema.ObjectId, ref: "userProjectModel"},
    postType: {type: String, enum: ["TEXT", "IMAGE","YOUTUBE"]},
    dateUpdated: {type: Date, default: Date.now},
    name: String,
    placeholder: String,
    description: String,
    url: String,
    width: {type: String, default: '100%'},
    post: {type: String, require: true},
    size: {type: Number, default: 0},
    formatted: Boolean
}, {collection: "post"});

module.exports = postSchema;
