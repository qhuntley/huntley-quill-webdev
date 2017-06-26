(function () {
    angular
        .module('MovieApp')
        .controller('postNewController', postNewController);

    function postNewController(currentUser, $routeParams,
                                 postProjectService,
                                 $location, $sce) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.postId = $routeParams['postId'];

        function init() {
            postProjectService
                .findAllPostsForUser(model.userId)
                .then(function(posts) {
                    model.posts = posts;
                });
        }
        init();

        model.createPost = createPost;


        function createPost(post) {
            if(typeof review === 'undefined') {
                model.error = "Post name required!";
                return;
            }
            postProjectService
                .createPost(currentUser._id, model.movieId, post)
                .then(function () {
                    $location.url('/page/'+model.movieId);
                });
        }

    }
}) ();

