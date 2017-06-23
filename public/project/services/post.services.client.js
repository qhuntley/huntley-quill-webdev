(function () {
    angular
        .module('MovieApp')
        .factory('postProjectService', postProjectService);

    function postProjectService($http, $routeParams) {

        return {
            createPost: createPost,
            findPostsByUserId:findPostsByUserId,
            findPostById:findPostById,
            updatePost: updatePost,
            deletePost: deletePost
        };

        function createPost (userId, post) {
            var url = "/api/project/user/" + userId + "/post";
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePost(postId, post) {
            var url = "/api/project/post/" + postId;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                });
        }


        function deletePost(postId) {
            var url = "/api/project/post/" + postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostById(postId) {
            var url = "/api/project/post/" + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostsByUserId(userId) {
            var url = "/api/project/user/" + userId + "/post";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();



/*
(function () {
    angular
        .module('MovieApp')
        .factory('postProjectService', postProjectService);

    function postProjectService($http) {

        var api = {
            findAllPostsForUser: findAllPostsForUser,
            createPost: createPost,
            updatePost: updatePost,
            deletePost: deletePost,
            findPostById: findPostById,
            findAllPosts: findAllPosts
        };

        return api;

        function findAllPostsForUser(userId) {
            var url = "/api/project/user/" + userId +"/post";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPost(postId, post) {
            var url = "/api/project/user/" + postId + "/post";
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePost(postId, post) {
            var url = "/api/project/post/" + postId;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(postId) {
            var url = "/api/project/post/" + postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostById(postId) {
            var url = "/api/project/post/" + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPosts(author, name, post) {
            var url = "/api/project/post";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();*/
