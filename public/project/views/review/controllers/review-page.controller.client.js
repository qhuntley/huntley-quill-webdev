(function () {
    angular
        .module('MovieApp')
        .controller('reviewPageController', reviewPageController);

    function reviewPageController($routeParams, reviewProjectService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.reviewId = $routeParams['reviewId'];

        function init() {
            reviewProjectService
                .findReviewById(model.reviewId)
                .then(function(reviews) {
                    model.reviews = reviews;
                });
        }
        init();
    }
}) ();
