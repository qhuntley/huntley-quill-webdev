(function () {
    angular
        .module('MovieApp')
        .controller('searchController', searchController);

    function searchController(currentUser, $location, $routeParams, homeService) {
        var model = this;
        model.currentUser = currentUser;
        model.searchTerm = $routeParams['searchTerm'];
        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;
        model.goBack = goBack;

        function init() {
            homeService
                .searchNewMovies(model.searchTerm)
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }
        init();

        function goBack() {
            window.history.back();
        }

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