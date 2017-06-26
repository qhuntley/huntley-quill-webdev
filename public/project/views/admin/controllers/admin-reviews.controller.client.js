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

        function init() {
            findAllReviews();
        }
        init();

        function deleteReview(review) {
            reviewProjectService
                .deleteReview(review._id)
                .then(findAllReviews);
        }

        function createReview(review) {
            reviewProjectService
                .createReview(review._reviewer, review.movieId, review)
                .then(findAllReviews);
        }

        function selectReview(review) {
            model.review = angular.copy(review);
        }

        function updateReview(review) {
            reviewProjectService
                .updateReview(review._reviewer, review.movieId, review._id)
                .then(findAllReviews);
        }

        function findAllReviews() {
            reviewProjectService
                .findAllReviews()
                .then(function (reviews) {
                    console.log(reviews[0]._reviewer);
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