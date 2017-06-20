var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewProjectModel = mongoose.model('reviewProjectModel', reviewSchema);
