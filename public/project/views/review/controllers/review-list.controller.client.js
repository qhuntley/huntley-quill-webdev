(function () {
    angular
        .module('MovieApp')
        .controller('reviewListController', reviewListController);

    function reviewListController($routeParams, reviewProjectService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.reviewId = $routeParams['reviewId'];


        function init() {
            reviewProjectService
                .findAllReviewsForUser(model.userId)
                .then(function (reviews) {
                    model.reviews = reviews;
                })
        }
        init();
    }
}) ();
