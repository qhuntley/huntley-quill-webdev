(function () {
    angular
        .module('MovieApp')
        .controller('adminPostEditsProjectController', adminPostEditsProjectController);

    function adminPostEditsProjectController(postProjectService, $location, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];

        model.updatePost=  updatePost;

        function init() {
            postProjectService
                .findPostById(model.postId)
                .then(function(post) {
                    model.post = post;
                    console.log(post.postType);
                });
        }
        init();

        function updatePost(post) {
           postProjectService
                .updatePost(post._author, post.movieId, post._id, post)
                .then (function () {
                    $location.url('#!/admin/posts');
                });
        }

    }
})();
