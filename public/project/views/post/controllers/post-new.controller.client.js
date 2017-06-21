(function () {
    angular
        .module('MovieApp')
        .controller('postNewController', postNewController);

    function postNewController($routeParams,
                                 postProjectService,
                                 $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.createPost = createPost;

        function init() {
            postProjectService
                .findAllPostsForUser(model.userId)
                .then(function (posts) {
                    model.posts = posts;
                })
        }
        init();

        function createPost (post) {
            if(typeof post === 'undefined') {
                model.error = "Post name required!";
                return;
            }
            postProjectService
                .createPost(model.userId, post)
                .then(function (post) {
                    $location.url('/user/' + model.userId + '/post');
                });
        }
    }
}) ();
