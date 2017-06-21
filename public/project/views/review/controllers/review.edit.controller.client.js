(function () {
    angular
        .module('MovieApp')
        .controller('reviewEditController', reviewEditController);

    function reviewEditController($routeParams,
                                   reviewProjectService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.reviewId = $routeParams.reviewId;


        model.createReview = createReview;
        model.updateReview =  updateReview;
        model.deleteReview =  deleteReview;

        function init() {
            reviewProjectService
                .findAllReviewsForUser(model.userId)
                .then(function(reviews) {
                    model.reviews = reviews;
                });

            reviewProjectService
                .findReviewById(model.reviewId)
                .then(function(review) {
                    model.review = review;
                });
        }
        init();

        function createReview (review) {
            reviewProjectService
                .createReview(model.userId, review)
                .then(function(review) {
                    $location.url('/user/' + model.userId + '/review');
                });

        }

        function updateReview(reviewId, review) {
            if(review.name === "") {
                model.error = "Review name required!";
                return;
            }

            reviewProjectService
                .updateReview(reviewId, review)
                .then(function(response) {
                    $location.url('/user/' + model.userId + '/review');
                });

        }

        function deleteReview(reviewId) {
            reviewProjectService
                .deleteReview(reviewId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/review');
                });
        }
    }
}) ();
