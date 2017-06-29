(function () {
    angular
        .module('MovieApp')
        .controller('adminReviewsProjectController', adminReviewsProjectController);

    function adminReviewsProjectController(reviewProjectService, userProjectService, $location, $routeParams) {
        var model = this;
        model.reviewId = $routeParams['reviewId'];

        model.deleteReview = deleteReview;
        model.selectReview = selectReview;
        model.createReview = createReview;
        model.updateReview = updateReview;
        model.goBack = goBack;

        function init() {
            findAllReviews();
        }
        init();

        function goBack() {
            window.history.back();
        }

        function deleteReview(review) {
            console.log(review._id);
            reviewProjectService
                .deleteReview(review._reviewer, review.movieId, review._id, review)
                .then(findAllReviews);
        }

        function createReview(review) {
            if(typeof review === 'undefined' || review._reviewer === 'undefined' || !review._review == "" ||review.movieId ==="") {
                model.error = "Review, Username and MovieId are mandatory fields";
                return;
            }

            reviewProjectService
                .createReview(review._reviewer, review.movieId, review)
                .then(findAllReviews);
        }

        function selectReview(review) {
            model.review = angular.copy(review);
        }

        function updateReview(review) {
            if(typeof review === 'undefined' || !review.review ||review.review ===""
                || !review.rating || review.rating < 0 || !review.movieId || !review._reviewer) {
                model.error = "All fields must be populated required";
                return;
            }
            reviewProjectService
                .updateReview(review._reviewer, review.movieId, review._id, review)
                .then(findAllReviews);
        }

        function findAllReviews() {
            reviewProjectService
                .findAllReviews()
                .then(function (reviews) {
                    model.reviews= reviews;
                });
        }

        /*function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }*/
    }
})();