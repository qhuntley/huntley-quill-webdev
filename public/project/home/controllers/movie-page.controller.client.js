(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController($location, $routeParams, homeService) {
        var model = this;
        model.movieId = $routeParams['movieId'];

        function init() {
            homeService
                .searchMovieById(model.movieId)
                .then(function (response) {
                    model.movie = response.data;
                    console.log(model.movie);
                });
        }
        init();
    }

})();