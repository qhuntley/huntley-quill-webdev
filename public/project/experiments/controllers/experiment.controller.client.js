(function () {
    angular
        .module('MovieApp')
        .controller('experimentController', experimentController);

    function experimentController(homeService, $location, $routeParams) {
        var model = this;
        model.movieId = $routeParams['movieId'];

        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;

        function searchNewMovies(searchTerm) {
            homeService
                .searchNewMovies(searchTerm)
                .then(function (response) {
                    model.movies = response.data.results;
                })
        }

        function selectMovie(movieId) {
            $location.url('/experiment/details/' + movieId);
        }

    }
})();