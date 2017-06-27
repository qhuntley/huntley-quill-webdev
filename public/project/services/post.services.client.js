(function () {
    angular
        .module('MovieApp')
        .factory('postProjectService', postProjectService);

    function postProjectService($http) {

        return {
            createPost: createPost,
            findPostsByUserId:findPostsByUserId,
            findPostById:findPostById,
            updatePost: updatePost,
            deletePost: deletePost,
            findPostsByMovieId: findPostsByMovieId,
            findAllPosts: findAllPosts
        };

        function createPost (userId, movieId, post) {
            var url = '/api/project/user/'+ userId + '/movie/' + movieId + '/post';
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostsByMovieId(movieId) {
            var url = "/api/project/posts/" + movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePost(userId, movieId, postId, post) {
            var url = '/api/project/user/' + userId + '/movie/' + movieId + '/post/' + postId;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(userId, movieId, postId, post) {
            var url = '/api/project/user/' + userId + '/movie/' + movieId + '/post/' + postId;
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

        function findAllPosts() {
            var url = "/api/posts";
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