(function () {
    angular
        .module('MovieApp')
        .controller('searchController', searchController);

    function searchController(currentUser, $location, $routeParams, homeService, $route) {
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
                    if(response.data.results.length > 0) {
                        model.movies = response.data.results;
                    } else {
                        model.error = "No search results found, please try again";
                        return;
                    }
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
                        if(response.data.results.length > 0) {
                            model.movies = response.data.results;
                        } else {
                            model.error = "Please try again";
                        }
                        $route.reload;
                    });
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

    }

})();