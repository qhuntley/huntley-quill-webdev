(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController(currentUser, $sce, $location, $routeParams, homeService, $scope,
                             reviewProjectService, postProjectService, $route) {

        var model = this;
        model.movieId = $routeParams['movieId'];
        model.loggedUser = currentUser;
        model.upcomingIndex = 1;
        model.canCreate = false;
        model.canEdit = false;

        function init() {

            homeService
                .searchMovieById(model.movieId)
                .then(function (response) {
                    model.movie = response.data;
                    model.genres = response.data.genres;
                    var path = model.movie.backdrop_path;
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
                    for (i = 0; i < data.length; i++) {
                        temp.push(data[i]);
                    }
                    model.similarMovie = temp;
                });

            homeService
                .recommendedMovies(model.movieId)
                .then(function (response) {
                    var data = response.data.results;
                    model.recommendedMovie = [];
                    for (i = 0; i < data.length; i++) {
                        model.recommendedMovie.push(data[i]);
                    }
                });

            reviewProjectService
                .findReviewsByMovieId(model.movieId)
                .then(function (response) {
                    model.reviews = response;
                });

            postProjectService
                .findPostsByMovieId(model.movieId)
                .then(function (response) {
                    model.posts = response;
                });

            if (model.loggedUser._id) {
                var reviews = model.loggedUser.reviews;
                console.log(reviews.length === 0);
                if (reviews.length !== 0) {
                    for (i = 0; i < reviews.length; i++) {
                        var currReview = reviews[i];
                        console.log(model.movieId === currReview.movieId + '');
                        if (currReview.movieId + '' === model.movieId) {
                            model.canCreate = false;
                            model.canEdit = true;
                            break;
                        }
                        else {
                            model.canCreate = true;
                        }
                    }
                }
                else {
                    model.canCreate = true;
                }
            }

            console.log(model.canCreate);


            if (model.canEdit) {
                reviewProjectService
                    .findMovieReviewByUserId(model.loggedUser._id, model.movieId);
                // .then(function (response) {
                //     console.log(response);
                //     model.review = response;
                // });
            }
        }

        init();

        model.createReview = createReview;
        model.selectMovie = selectMovie;
        model.selectReview = selectReview;
        model.editReview = editReview;
        model.deleteReview = deleteReview;

        // navigate to another movie page
        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

        // CRUD reviews
        function selectReview(review) {
            console.log(review);
            reviewer = review._reviewer;
            var userId = reviewer._id;
            console.log(userId);
            $location.url('/user/' + userId + '/profile-public');
        }

        function createReview(review) {
            console.log(review);
            if (typeof review === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            reviewProjectService
                .createReview(model.loggedUser._id, model.movieId, review)
                .then(function () {
                    model.canCreate = false;
                    model.canEdit = true;
                    $route.reload();
                });
        }

        function editReview(review) {
            var reviewId = review._id;

            reviewProjectService
                .editReview(model.loggedUser._id, model.movieId, reviewId, review)
                .then(function () {
                    model.mssage = "Review Updated Successfully";
                    $location.reload();
                });
            $location.url('/user/' + currentUser._id + '/movie/' + model.movieId + '/review/' + reviewId);
        }

        function deleteReview(review) {

        }

        //Posts
        model.selectPost = selectPost;
        model.editPost = editPost;
        model.deletePost = deletePost;
        model.createPost = createPost;

        function selectPost(post) {
            console.log(post);
            author = post._author;
            var userId = author._id;
            console.log(userId);
            $location.url('/user/' + userId + '/profile-public');
        }

        function deletePost(post) {

        }

        function editPost(post) {
            var postId = post._id;

            postProjectService
                .editPost(model.loggedUser._id, model.movieId, postId, post)
                .then(function () {
                    model.mssage = "Post Updated Successfully";
                    $location.reload();
                });
            $location.url('/user/' + currentUser._id + '/movie/' + model.movieId + '/post/' + postId);
        }

        function createPost(post) {
            console.log(post);
            if (typeof post === 'undefined') {
                model.error = "Post name required!";
                return;
            }
            postProjectService
                .createPost(model.loggedUser._id, model.movieId, post)
                .then(function () {
                    console.log(post);
                    $route.reload();
                });
        }


        $(document).on('change', '.div-toggle', function () {
            var target = $(this).data('target');
            var show = $("option:selected", this).data('show');
            $(target).children().addClass('hide');
            $(show).removeClass('hide');
        });
        $(document).ready(function () {
            $('.div-toggle').trigger('change');
        });

    }

    })();