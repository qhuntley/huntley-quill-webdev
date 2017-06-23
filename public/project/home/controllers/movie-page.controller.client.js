(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController($sce, $location, $routeParams, homeService, $scope) {
        var model = this;
        model.movieId = $routeParams['movieId'];
        model.upcomingIndex = 1;
        model.increaseUpcoming = function () {
            if(model.similarMovie.length <= model.upcomingIndex){
                model.upcomingIndex = 1;
            }
            else {
                model.upcomingIndex++;
            }
        };
        model.decreaseUpcoming = function () {
            if(model.upcomingIndex == 1){
                model.upcomingIndex = model.similarMovie.length;
            }
            else {
                model.upcomingIndex--;
            }
        };

        function init() {
            homeService
                .searchMovieById(model.movieId)
                .then(function (response) {
                    model.movie = response.data;
                    model.genres = response.data.genres;
                    var path = model.movie.backdrop_path;
                    //model.path = response.data.backdrop_path;
                    //document.body.style.background = 'url(' + 'http://image.tmdb.org/t/p/original' + model.path + ') no-repeat top left';
                    //document.body.style.backgroundSize = 1;
                });

            homeService
                .searchCast(model.movieId)
                .then(function (response) {
                    model.casts = response.data.cast;
                });

            homeService
                .similarMovies(model.movieId)
                .then(function (response) {
                    temp = [];
                    var data = response.data.results;
                    for(i =0; i < data.length; i++){
                        temp.push(data[i]);
                    }
                    model.similarMovie = temp;
                });

            homeService
                .recommendedMovies(model.movieId)
                .then(function (response) {
                    var data = response.data.results;
                    model.recommendedMovie = [];
                    for(i =0; i < data.length; i++){
                        model.recommendedMovie.push(data[i]);
                    }
                })
        }
        init();

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.selectMovie = selectMovie;

        function getYouTubeEmbedUrl() {
            return homeService
                .searchVideos(model.movieId)
                .then(function (response) {
                    model.videoKeys = response.data.results;
                })
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

    }

})();