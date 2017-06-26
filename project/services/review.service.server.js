var app = require('../../express');
var reviewProjectModel = require('../model/review/review.model.server');
var userProjectModel = require('../model/user/user.model.server');

app.get('/api/project/user/:userId/review', findAllReviewsForUser);
app.post('/api/project/user/:userId/movie/:movieId/review', createReview);
app.put('/api/project/user/:userId/movie/:movieId/review/:reviewId', updateReview);
app.get('/api/project/review/:reviewId', findReviewById);
app.delete('/api/project/review/:reviewId', deleteReview);
app.get('/api/project/review', isAdmin, findAllReviews);
app.get('/api/project/:movieId', findReviewsByMovieId);
app.get('/api/project/user/:userId/movie/:movieId', findMovieReviewByUserId);

function findAllReviewsForUser(req, res) {
    reviewProjectModel
        .findAllReviewsForUser(req.params.userId)
        .then(function (reviews) {
            res.json(reviews);
        });

}

function findMovieReviewByUserId(req, res) {
    console.log("inserver");
    var userId = req.params['userId'];
    var movieId = req.params.movieId;
    reviewProjectModel
        .findMovieReviewByUserId(userId, movieId)
        .then(function (reviews) {
            res.json(reviews);
        });

}

function createReview(req, res) {
    var review = req.body;
    var userId = req.params['userId'];
    var movieId = req.params.movieId;
    reviewProjectModel
        .createReview(userId, movieId, review)
        .then(function (review) {
            res.json(review);
        });
}

function updateReview(req, res) {
    var review = req.body;
    var userId = req.params['userId'];
    var movieId = req.params.movieId;
    var reviewId =  req.params.reviewId;
    reviewProjectModel
        .updateReview(userId, movieId, reviewId, review)
        .then(function (status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    reviewProjectModel
        .deleteReview(reviewId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findReviewById(req, res) {
    var reviewId = req.params.reviewId;
    reviewProjectModel
        .findReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        });
}

function findAllReviews(req, res) {
    var reviewer = req.query['_reviewer'];
    var review = req.query['review'];
    var rating = req.query['rating'];
    if(reviewer && review && rating) {
        return findAllReviewsForUser(req, res);
    }
    reviewProjectModel
        .findAllReviews()
        .then(function (reviews) {
            res.json(reviews);
        });
}


function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findReviewsByMovieId(req, res) {
    var movieId = req.params['movieId'];
    console.log(movieId);
     reviewProjectModel
        .findReviewsByMovieId(movieId)
        .then(function (reviews) {
            res.json(reviews);
        });
}
