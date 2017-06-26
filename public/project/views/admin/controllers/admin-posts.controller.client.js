(function () {
    angular
        .module('MovieApp')
        .controller('adminPostsProjectController', adminPostsProjectController);

    function adminPostsProjectController(postProjectService, $location, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];

        model.deletePost = deletePost;
        model.selectPost = selectPost;
        model.createPost = createPost;
        model.updatePost = updatePost;

        function init() {
            findAllPosts();
        }
        init();

        function deletePost(post) {
            postProjectService
                .deletePost(post._id)
                .then(findAllPosts);
        }

        function createPost(post) {
            postProjectService
                .createPost(post._author, post.movieId, post)
                .then(findAllPosts);
        }

        function selectPost(post) {
            model.post = angular.copy(post);
        }

        function updatePost(post) {
            postProjectService
                .updatePost(post._author, post.movieId, post._id)
                .then(findAllPosts);
        }

        function findAllPosts() {
            postProjectService
                .findAllPosts()
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        /*function updateUser(user) {
         userProjectService
         .updateUser(user._id, user)
         .then(findAllUsers);
         }*/
    }
})();