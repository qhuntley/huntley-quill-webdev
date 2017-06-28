(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController(currentUser, $sce, $location, $routeParams, homeService, $scope,
                             reviewProjectService,postProjectService, $route) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.movieId = $routeParams['movieId'];
        model.postId = $routeParams['postId'];

        model.loggedUser = currentUser;
        model.upcomingIndex = 1;
        model.canCreate = false;
        model.canEdit = false;
        model.canView = true;
        model.normalUser = true;
        model.currentEdit = false;
        model. getYouTubeEmbedUrl =  getYouTubeEmbedUrl;

        function init() {

            // movie data
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
                });

            //posts
            postProjectService
                .findPostsByMovieId(model.movieId)
                .then(function (response) {
                    model.posts = response;
                    // if(model.posts.length != 0){
                    //     model.canEdit = true;
                    // }
                });

            // reviews
            reviewProjectService
                .findReviewsByMovieId(model.movieId)
                .then(function (response) {
                    model.reviews = response;
                });

            if(model.loggedUser._id){
                if(model.loggedUser.roles.indexOf('CELEBRITY') >= 0) {
                    model.normalUser = false;
                }
                else if (model.loggedUser.roles.indexOf('ADMIN') >= 0) {
                    model.normalUser = false;
                }
            }
            $(document).ready(function() {
                var maxLength = 500;
                $('#remainingWrite').html(maxLength + ' characters remaining');

                $('#reviewWrite').keyup(function() {
                    var textLength = $('#reviewWrite').val().length;
                    var remainingLength = maxLength - textLength;

                    $('#remainingWrite').html(remainingLength + ' characters remaining');
                    if(maxLength === remainingLength) {
                        model.error1 = "Cannot have empty review"
                    }
                });
            });

            $(document).ready(function() {
                var maxLength = 500;
                $('#reviewEdit').keyup(function() {
                    var textLength = $('#reviewEdit').val().length;
                    var remainingLength = maxLength - textLength;

                $('#remainingEdit').html(remainingLength + ' characters remaining');
                    if(remainingLength ===maxLength) {
                        model.error2 = "Cannot have empty review"
                    }
                });
            });

            // for reviews
            if(model.loggedUser._id) {
                var reviews = model.loggedUser.reviews;
                console.log(reviews.length === 0);
                if(reviews.length !== 0){
                    for(i = 0; i < reviews.length; i++){
                        var currReview = reviews[i];
                        console.log(model.movieId === currReview.movieId+'');
                        if(currReview.movieId+'' === model.movieId){
                            model.canCreate = false;
                            model.canView = false;
                            break;
                        }
                        else {
                            model.canCreate = true;
                        }
                    }
                }
                else{
                    model.canCreate = true;
                }
            }
            console.log(model.canCreate);
        }
        init();

        model.createReview = createReview;
        model.selectMovie = selectMovie;
        model.selectReview = selectReview;
        model.editReview = editReview;
        model.deleteReview = deleteReview;
        model.updateReview = updateReview;
        model.createPost = createPost;
        model.selectPost = selectPost;
        model.deletePost = deletePost;
        model.editPost = editPost;
        model.updatePost = updatePost;

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
            $location.url('/user/'+ userId + '/profile-public');
        }

        function createReview(review) {
            console.log(review);
            if(typeof review === 'undefined' || (!review.rating))  {
                model.error = "Both fields required!";
                return;
            }
            /*if(!review.rating) {
                model.message = "Please include rating";
                return;
            }*/

            reviewProjectService
                .createReview(model.loggedUser._id, model.movieId, review)
                .then(function () {
                    model.canCreate = false;
                    model.canView = false;
                    init();
                });
        }

        function editReview(review) {
            model.canEdit = true;
            model.review = review;
        }

        function updateReview(review) {
            if(typeof review === 'undefined' || !(model.review.rating))  {
                model.error2 = "Both fields required!";
                return;
            }

            var reviewId = review._id;

            reviewProjectService
                .updateReview(model.loggedUser._id, model.movieId, reviewId, review)
                .then(function (review) {
                    model.message = "Review Updated Successfully";
                    $route.reload();
                });
        }

        function deleteReview(review) {
            var reviewId = review._id;

            reviewProjectService
                .deleteReview(model.loggedUser._id, model.movieId, reviewId, review)
                .then(function () {
                    model.message = "Review Deleted Successfully";
                    model.canCreate = true;
                    //model.canEdit = true;
                    model.canView = true;
                    $route.reload();
                });

        }

        //Posts

        function selectPost(post) {
            author = post._author;
            var userId = author._id;
            $location.url('/user/'+ userId + '/profile-public');
        }

        function createPost(post) {
            if(typeof post === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            if(post.post) {
                post.postType = 'TEXT';
            }
            if(post.description) {
                post.postType = 'YOUTUBE';
            }
            if(post.name) {
                //post = {"postType": "", "pageId": "", "width": "", "url": ""};
                post.postType = 'IMAGE';
            }
            postProjectService
                .createPost(model.loggedUser._id, model.movieId, post)
                .then(function () {
                    $route.reload();
                })
        }

        function editPost(post) {
            model.canEdit = true;
            model.currentEdit = true;
            model.post = post;
        }

        function updatePost(post) {
            var postId = post._id;

            postProjectService
                .updatePost(model.loggedUser._id, model.movieId, postId, post)
                .then(function (post) {
                    model.message = "Post Updated Successfully";
                    $route.reload();
                });
        }

        function deletePost(post) {
            var postId = post._id;

            postProjectService
                .deletePost(model.loggedUser._id, model.movieId, postId, post)
                .then(function () {
                    model.message = "Post Deleted Successfully";
                    model.canCreate = true;
                    model.canView = true;
                    $route.reload();
                });

        }

        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youTubeLinkParts = youtubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        $(document).on('change', '.div-toggle', function() {
            var target = $(this).data('target');
            var show = $("option:selected", this).data('show');
            $(target).children().addClass('hide');
            $(show).removeClass('hide');
        });
        $(document).ready(function(){
            $('.div-toggle').trigger('change');
        });

    }

})();