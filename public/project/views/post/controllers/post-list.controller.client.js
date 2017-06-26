(function () {
    angular
        .module('MovieApp')
        .controller('postListController', postListController);

    function postListController($routeParams,
                                  postProjectService,
                                  $sce) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.postId = $routeParams['postId'];


        function init() {
            postProjectService
                .findAllPostsForUser(model.userId)
                .then(function (posts) {
                    model.posts = posts;
                });

            function handleError(error) {
                console.log("error");
                model.error = "No available posts";
            }
        }
        init();

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getPostUrlForType = getPostUrlForType;

        function getPostUrlForType (type) {
            return 'views/post/templates/post-'+ type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youTubeLinkParts = youtubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }
}) ();

