(function () {
    angular
        .module('MovieApp')
        .service('homeService', homeService);

    function homeService($http) {
        this.searchNewMovies = searchNewMovies;
        this.searchMovieById = searchMovieById;
        this.searchVideos = searchVideos;
        this.searchCast = searchCast;
        this.similarMovies = similarMovies;
        this.recommendedMovies = recommendedMovies;
        this.upcomingMovies = upcomingMovies;
        this.latestMovies = latestMovies;
        this.currentMovies = currentMovies;
        this.popularMovies = popularMovies;
        this.topRatedMovies = topRatedMovies;

        var key = "ac640050d4d7695842fcd9ee3c44de09";
        var upcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US&page=1';
        var search = 'https://api.themoviedb.org/3/search/movie?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US&query=TEXT&page=1&include_adult=false';
        var movieById = 'https://api.themoviedb.org/3/movie/ID?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';
        var searchVideo = 'https://api.themoviedb.org/3/movie/ID/videos?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';
        var cast = 'https://api.themoviedb.org/3/movie/ID/credits?api_key=ac640050d4d7695842fcd9ee3c44de09';
        var similar = 'https://api.themoviedb.org/3/movie/ID/similar?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US&page=1';
        var recommendations = 'https://api.themoviedb.org/3/movie/ID/recommendations?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';
        var latest = 'https://api.themoviedb.org/3/movie/latest?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';
        var nowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US&page=1';
        var popular = 'https://api.themoviedb.org/3/movie/popular?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';
        var topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ac640050d4d7695842fcd9ee3c44de09&language=en-US';

        function searchNewMovies(searchTerm) {
            var url = search.replace("TEXT", searchTerm);
            console.log($http.get(url));
            return $http.get(url);
        }

        function searchMovieById(movieId) {
            var url = movieById.replace("ID", movieId);
            return $http.get(url);
        }

        function searchCast(movieId) {
            var url = cast.replace("ID", movieId);
            return $http.get(url);
        }

        function searchVideos(movieId) {
            var url = searchVideo.replace("ID", movieId);
            return $http.get(url);
            // .then(function (response) {
            //     console.log(response.data);
            //     return response.data;
            // });
        }

        function similarMovies(movieId) {
            var url = similar.replace("ID", movieId);
            return $http.get(url);
        }

        function recommendedMovies(movieId) {
            var url = recommendations.replace("ID", movieId);
            return $http.get(url);
        }

        function upcomingMovies() {
            return $http.get(upcoming);
        }

        function popularMovies() {
            return $http.get(popular);
        }

        function latestMovies() {
            return $http.get(latest)
                .then(function (response) {
                    console.log("in hereeeeeeee");
                    console.log(response.data);
                    return response.data;
                });
        }

        function currentMovies() {
            return $http.get(nowPlaying);
        }

        function topRatedMovies() {
            return $http.get(topRated);
        }
    }
})();