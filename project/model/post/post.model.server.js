var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postProjectModel = mongoose.model('postProjectModel', postSchema);
var userProjectModel = require('../user/user.model.server');


postProjectModel.findAllReviewsForUser = findAllReviewsForUser;
postProjectModel.createReview = createReview;
postProjectModel.updateReview = updateReview;
postProjectModel.deleteReview = deleteReview;
postProjectModel.findReviewById = findReviewById;
postProjectModel.findAllReviews = findAllReviews;


