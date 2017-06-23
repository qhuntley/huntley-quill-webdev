(function () {
    angular
        .module('MovieApp')
        .controller('searchController', searchController);

    function searchController($location, $routeParams, homeService) {
        var model = this;
        model.searchTerm = $routeParams['searchTerm'];
        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;


        function init() {
            homeService
                .searchNewMovies(model.searchTerm)
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }
        init();

        function searchNewMovies(term) {
            homeService
                .searchNewMovies(term)
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

    }

})();