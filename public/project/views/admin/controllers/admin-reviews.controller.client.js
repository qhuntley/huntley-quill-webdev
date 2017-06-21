(function () {
    angular
        .module('MovieApp')
        .controller('adminReviewsProjectController', adminReviewsProjectController);

    function adminReviewsProjectController(reviewProjectService) {
        var model = this;
        model.deleteReview = deleteReview;
        model.updateReview = updateReview;

        function init() {
            findAllReviews();
        }
        init();

        function deleteUser(user) {
            userProjectService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function findAllReviews() {
            userProjectService
                .findAllReviews()
                .then(function (reviews) {
                    model.reviews= reviews;
                });
        }

        function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }
    }
})();