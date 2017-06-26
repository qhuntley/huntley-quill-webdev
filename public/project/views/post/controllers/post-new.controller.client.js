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
        model.postType = postType;

        function postType(type) {
            model.type = type;
        }

        function createPost(userId, post) {
            if (model.type === 1){
                post = {"postType": "", "userId": "", "width": "", "url": ""};
                post.postType = "TEXT";
            }
            if (model.type === 2){
                post = {"postType": "", "userId": "", "width": "", "url": ""};
                post.postType = "IMAGE";
            }
            if (model.type === 3){
                post = {"postType": "", "userId": "", "width": "",
                    "url": "" };
                post.postType = "YOUTUBE";
            }
            postProjectService
                .createPost(currentUser._id, model.movieId, post)
                .then(function (post) {
                    console.log(post);
                    $location.url('/page/'+model.movieId);
                });
        }
    }
}) ();

