(function () {
    angular
        .module('MovieApp')
        .controller('reviewNewController', reviewNewController);

    function reviewNewController(currentUser, $routeParams,
                                  reviewProjectService,
                                  $location) {

        var model = this;
        model.movieId = $routeParams['movieId'];

        model.createReview = createReview;

        // function init() {
        //     reviewProjectService
        //         .findAllReviewsForUser(model.userId)
        //         .then(function (reviews) {
        //             model.reviews = reviews;
        //         })
        // }
        // init();

        function createReview (review) {
            if(typeof review === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            reviewProjectService
                .createReview(currentUser._id, model.movieId, review)
                .then(function () {
                    $location.url('/page/'+model.movieId);
                });
        }
    }
}) ();
