(function () {
    angular
        .module('MovieApp')
        .controller('homeController', homeController);

    function homeController(currentUser, homeService, userProjectService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;
        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;
        model.searchPage = searchPage;

        model.upcomingIndex = 1;
        model.increaseUpcoming = function () {
            if(model.upcomingMovies.length <= model.upcomingIndex){
                model.upcomingIndex = 1;
            }
            else {
                model.upcomingIndex++;
            }
        };
        model.decreaseUpcoming = function () {
            if(model.upcomingIndex == 1){
                model.upcomingIndex = model.upcomingMovies.length;
            }
            else {
                model.upcomingIndex--;
            }
        };

        function init() {
            homeService
                .upcomingMovies()
                .then(function (response) {
                    model.upcomingMovies = response.data.results;
                });

            homeService
                .latestMovies()
                .then(function (response) {
                    console.log(response.data);
                    model.latestMovies = response.data;
                });

            homeService
                .currentMovies()
                .then(function (response) {
                    model.currentMovies = response.data.results;
                });

            homeService
                .popularMovies()
                .then(function (response) {
                    model.popularMovies = response.data.results;
                });

            homeService
                .topRatedMovies()
                .then(function (response) {
                    model.topRatedMovies = response.data.results;
                });

        }
        init();

        function searchNewMovies(searchTerm) {
            homeService
                .searchNewMovies(searchTerm)
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

        function searchPage(searchTerm) {
            if (searchTerm === null || searchTerm === '' || typeof searchTerm === 'undefined') {
                model.error = 'Please enter a valid search';
            } else {
                $location.url('/search/' + searchTerm);
            }
        }

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

    }
})();