(function () {
    angular
        .module('MovieApp')
        .controller('postListController', postListController);

    function postListController($routeParams, postProjectService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.postId = $routeParams['postId'];


        function init() {
            postProjectService
                .findAllPostsForUser(model.userId)
                .then(function (posts) {
                    model.posts = posts;
                })
        }
        init();
    }
}) ();
