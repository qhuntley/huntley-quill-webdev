(function () {
    angular
        .module('MovieApp')
        .controller('adminPostsProjectController', adminPostsProjectController);

    function adminPostsProjectController(postProjectService, $location, $routeParams) {
        var model = this;
        //model.postId = $routeParams['postId'];
        //model.userId = $routeParams['userId'];
        //model._author = $routeParams['_author'];


        model.deletePost = deletePost;
        model.selectPost = selectPost;
        model.createPost = createPost;
        model.updatePost = updatePost;

        function init() {
            findAllPosts();
        }
        init();

        // change the number of paramaters passed to delete, update, to match client server
        function deletePost(post) {
            postProjectService
                .deletePost(post._author, post.movieId, post._id, post)
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
                .updatePost(post._author, post.movieId, post._id, post)
                .then(findAllPosts);
        }

        function findAllPosts() {
            postProjectService
                .findAllPosts()
                .then(function (posts) {
                    console.log('this is the post');
                    console.log(posts[0]._author);
                    model.posts = posts;
                });
        }

    }
})();