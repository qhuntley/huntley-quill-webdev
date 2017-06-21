(function () {
    angular
        .module('MovieApp')
        .factory('reviewProjectService', reviewProjectService);

    function reviewProjectService($http) {

        var api = {
            findAllReviewsForUser: findAllReviewsForUser,
            createReview: createReview,
            updateReview: updateReview,
            deleteReview: deleteReview,
            findReviewById: findReviewById,
            findAllReviews: findAllReviews
        };

        return api;

        function findAllReviewsForUser(userId) {
            var url = "/api/project/user/" + userId +"/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(userId, review) {
            var url = "/api/project/user/" + userId + "/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(reviewId, review) {
            var url = "/api/project/review/" + reviewId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewById(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllReviews(reviewer, review, rating) {
            var url = "/api/project/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();