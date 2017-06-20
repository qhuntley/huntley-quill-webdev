
var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    _reviewer: {type: mongoose.Schema.ObjectId, ref: "userProjectModel"},
    dateUpdated: {type: Date, default: Date.now},
    movieId: Number,
    review: {type: String, require: true},
    rating: {type: Number, require: true}
}, {collection: "reviews"});

module.exports = reviewSchema;
