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
                });

            // reviews
            reviewProjectService
                .findReviewsByMovieId(model.movieId)
                .then(function (response) {
                    model.reviews = response;
                });

            if(model.loggedUser._id) {
                var reviews = model.loggedUser.reviews;
                console.log(reviews.length === 0);
                if(reviews.length !== 0){
                    for(i = 0; i < reviews.length; i++){
                        var currReview = reviews[i];
                        console.log(model.movieId === currReview.movieId+'');
                        if(currReview.movieId+'' === model.movieId){
                            model.canCreate = false;
                            //model.canEdit = true;
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

            if(model.canEdit){
                reviewProjectService
                    .findMovieReviewByUserId(model.loggedUser._id,model.movieId);
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
            if(typeof review === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            reviewProjectService
                .createReview(model.loggedUser._id, model.movieId, review)
                .then(function () {
                    model.canCreate = false;
                    //model.canEdit = true;
                    model.canView = false;
                    $route.reload();
                });
        }

        function editReview(review) {
            model.canEdit = true;
            model.review = review;
        }

        function updateReview(review) {

            var reviewId = review._id;

            reviewProjectService
                .updateReview(model.loggedUser._id, model.movieId, reviewId, review)
                .then(function (review) {
                    console.log(review);
                    model.message = "Review Updated Successfully";
                    $route.reload();
                });
        }

        function deleteReview(review) {
            console.log(review);
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
            console.log(post);
            author = post._author;
            var userId = author._id;
            console.log(userId);
            $location.url('/user/'+ userId + '/profile-public');
        }

        function createPost(post) {
            if(typeof post === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            console.log("create");
            console.log(post);
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
            model.post = post;
        }

        function updatePost(post) {
            var postId = post._id;

            postProjectService
                .updatePost(model.loggedUser._id, model.movieId, postId, post)
                .then(function (post) {
                    console.log(post);
                    model.message = "Post Updated Successfully";
                    $route.reload();
                });
        }

        function deletePost(post) {
            console.log(post);
            var postId = post._id;

            postProjectService
                .deletePost(model.loggedUser._id, model.movieId, postId, post)
                .then(function () {
                    model.message = "Post Deleted Successfully";
                    model.canCreate = true;
                    //model.canEdit = true;
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