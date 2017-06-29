(function () {
    angular
        .module('MovieApp')
        .controller('adminPostNewProjectController', adminPostNewProjectController);

    function adminPostNewProjectController(currentUser, $routeParams,
                               postProjectService,
                               $location, $sce) {

        var model = this;

        model.loggedUser = currentUser;
        model.create = create;
        model.goBack = goBack;

        function goBack() {
            window.history.back();
        }

        function create(post) {
            console.log(post);
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
                post.postType = 'IMAGE';
            }
            postProjectService
                .createPost(model.loggedUser._id, post.movieId, post)
                .then(function (post) {
                    console.log(post);
                    $location.url('/admin/posts');
                })
        }
    }
}) ();

