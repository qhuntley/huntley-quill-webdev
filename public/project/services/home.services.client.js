(function () {
    angular
        .module('MovieApp')
        .service('homeService', homeService);

    function homeService($http) {
        this.searchNewMovies = searchNewMovies;
        this.searchMovieById = searchMovieById;

        var key = "ac640050d4d7695842fcd9ee3c44de09";
        var upcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US&page=1';
        var search = 'https://api.themoviedb.org/3/search/movie?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US&query=TEXT&page=1&include_adult=false';
        var movieById = 'https://api.themoviedb.org/3/movie/ID?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';

        function searchNewMovies(searchTerm) {
            var url = search.replace("TEXT", searchTerm);
            console.log($http.get(url));
            return $http.get(url);
        }

        function searchMovieById(movieId) {
            var url = movieById.replace("ID", movieId);
            return $http.get(url)
        }
    }
})();