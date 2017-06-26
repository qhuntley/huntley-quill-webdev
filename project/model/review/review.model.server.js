var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewProjectModel = mongoose.model('reviewProjectModel', reviewSchema);
var userProjectModel = require('../user/user.model.server');


// find review by Movie id
// find review by user id
// create review
// delete review
// read view
// update view

reviewProjectModel.findAllReviewsForUser = findAllReviewsForUser;
reviewProjectModel.findReviewsByMovieId = findReviewsByMovieId;
reviewProjectModel.createReview = createReview;
reviewProjectModel.updateReview = updateReview;
reviewProjectModel.deleteReview = deleteReview;
reviewProjectModel.findReviewById = findReviewById;
reviewProjectModel.findAllReviews = findAllReviews;
reviewProjectModel.findMovieReviewByUserId = findMovieReviewByUserId;

module.exports = reviewProjectModel;

function findAllReviewsForUser(userId) {
    return reviewProjectModel
        .find({_reviewer: userId})
        .populate('_reviewer')
        .exec();
}

function findMovieReviewByUserId(userId, movieId) {
    console.log("finally here");
    var  reviews = reviewProjectModel.findOne();
    return reviewProjectModel.findAllReviewsForUser(userId);
    // if(reviews){
    //     for(i = 0; i <= reviews.length; i++){
    //         var currReview = reviews[i];
    //         if(currReview.movieId+'' == movieId+''){
    //             return currReview;
    //         }
    //     }
    // }
    // return 0;
}

function createReview(userId, movieId, review) {
    review._reviewer = userId;
    review.movieId = movieId;
    return reviewProjectModel
        .create(review)
        .then(function (review) {
            userProjectModel
                .findUserById(userId)
                .then(function (user) {
                    user.reviews.push(review);
                    user.save();
                });
        });
}

function updateReview(userId, movieId, reviewId, review) {
    return reviewProjectModel.update({_id: reviewId}, {
        $set: {
            _reviewer: userId,
            name: review.name,
            movieId: movieId,
            review: review.review,
            rating: review.rating
        }
    });

}

function deleteReview(reviewId) {
    return reviewProjectModel
        .remove({_id: reviewId})
        .then(function () {
            userProjectModel
                .findOne({reviews: reviewId})
                .then(function (user) {
                    var index = user.reviews.indexOf(reviewId);
                    user.reviews.splice(index, 1);
                    user.save();
                });
        });
}

function findReviewById(reviewId) {
    return reviewProjectModel.findById(reviewId)
}

function findAllReviews() {
    return reviewProjectModel.find();
}

function findReviewsByMovieId(movieId) {
    return reviewProjectModel
        .find({movieId: movieId})
        .populate('_reviewer')
        .exec();
}




