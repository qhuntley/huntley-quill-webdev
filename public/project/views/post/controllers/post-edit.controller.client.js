(function () {
    angular
        .module('MovieApp')
        .controller('postEditController', postEditController);

    function postEditController($routeParams,
                                  postProjectService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.postId = $routeParams.postId;


        model.createPost = createPost;
        model.updatePost=  updatePost;
        model.deletePost =  deletePost;

        function init() {
            postProjectService
                .findAllPostsForUser(model.userId)
                .then(function(posts) {
                    model.posts = posts;
                });

            postProjectService
                .findPostById(model.postId)
                .then(function(post) {
                    model.post = post;
                });
        }
        init();

        function createPost (post) {
            postProjectService
                .createPost(model.userId, post)
                .then(function(post) {
                    $location.url('/user/' + model.userId + '/post');
                });

        }

        function updatePost(postId, post) {
            if(post.name === "") {
                model.error = "Post name required!";
                return;
            }

            postProjectService
                .updatePost(postId, post)
                .then(function(response) {
                    $location.url('/user/' + model.userId + '/post');
                });

        }

        function deletePost (postId) {
            postProjectService
                .deletePost(postId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/post');
                });
        }
    }
}) ();
