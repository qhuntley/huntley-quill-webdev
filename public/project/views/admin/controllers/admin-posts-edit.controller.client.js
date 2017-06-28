(function () {
    angular
        .module('MovieApp')
        .controller('adminPostEditsProjectController', adminPostEditsProjectController);

    function adminPostEditsProjectController(currentUser,postProjectService, $location, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];

        model.loggedUser = currentUser;
        model.update=  update;

        function init() {
            postProjectService
                .findPostById(model.postId)
                .then(function(post) {
                    model.post = post;
                    console.log(post.postType);
                });
        }
        init();

        /*function updatePost(post) {
           postProjectService
                .updatePost(post._author, post.movieId, post._id, post)
                .then (function () {
                    $location.url('#!/admin/posts');
                });
        }*/
        function update(post) {
            var postId = post._id;

            postProjectService
                .updatePost(model.loggedUser._id, post.movieId, postId, post)
                .then(function (post) {
                    console.log(post);
                    model.message = "Post Updated Successfully";
                    $location.url('/admin/posts');
                });
        }

    }
})();
