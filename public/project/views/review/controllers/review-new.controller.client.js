(function () {
    angular
        .module('MovieApp')
        .controller('reviewNewController', reviewNewController);

    function reviewNewController($routeParams,
                                  reviewProjectService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.createReview = createReview;

        function init() {
            reviewProjectService
                .findAllReviewsForUser(model.userId)
                .then(function (reviews) {
                    model.reviews = reviews;
                })
        }
        init();

        function createReview (review) {
            if(typeof review === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            reviewProjectService
                .createReview(model.userId, review)
                .then(function (review) {
                    $location.url('/user/' + model.userId + '/review');
                });
        }
    }
}) ();
