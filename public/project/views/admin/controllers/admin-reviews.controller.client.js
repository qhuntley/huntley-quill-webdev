(function () {
    angular
        .module('MovieApp')
        .controller('adminReviewsProjectController', adminReviewsProjectController);

    function adminReviewsProjectController(userProjectService) {
        var model = this;

        model.deleteReview = deleteReview;
        model.selectReview = selectReview;
        model.createReview = createReview;
        model.updateReview = updateReview;


        function init() {
            findAllReviews();
        }
        init();

        function deleteReview(review) {
            userProjectService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function createReview(review) {
            userProjectService
                .createUser(user)
                .then(findAllUsers);
        }

        function selectReview(review) {
            model.user = angular.copy(user);
        }

        function updateReview(review) {
            userProjectService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function findAllReviews() {
            userProjectService
                .findAllReviews()
                .then(function (reviews) {
                    model.users = reviews;
                });
        }

    }
})();