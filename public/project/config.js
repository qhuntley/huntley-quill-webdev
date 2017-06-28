(function () {
    angular
        .module('MovieApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            // user routing
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerProjectController',
                controllerAs: 'model'
            })

            .when('/profile', {
                templateUrl: 'views/user/templates/user-private-profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/user/:userId/profile-public', {
                templateUrl: 'views/user/templates/user-public-profile.view.client.html',
                controller: 'userPublicProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
        /*    .when('/homefeed', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerProjectController',
                controllerAs: 'model'
            })*/
            .when('/page/:movieId', {
                templateUrl: 'views/home/templates/movie-page.view.client.html',
                controller: 'movieController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/search/:searchTerm', {
                templateUrl: 'views/home/templates/search-page.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/reviews', {
                templateUrl: 'views/admin/templates/admin-reviews.view.client.html',
                controller: 'adminReviewsProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/posts', {
                templateUrl: 'views/admin/templates/admin-posts.view.client.html',
                controller: 'adminPostsProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/posts/edit/:postId', {
                templateUrl: 'views/admin/templates/admin-posts-edit.view.client.html',
                controller: 'adminPostEditsProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/posts/new', {
                templateUrl: 'views/admin/templates/admin-posts-chooser.view.client.html',
                controller: 'adminPostNewProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/posts/new/text', {
                templateUrl: 'views/admin/templates/admin-posts-new-text.view.client.html',
                controller: 'adminPostNewProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/posts/new/image', {
                templateUrl: 'views/admin/templates/admin-posts-new-image.view.client.html',
                controller: 'adminPostNewProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/posts/new/youtube', {
                templateUrl: 'views/admin/templates/admin-posts-new-youtube.view.client.html',
                controller: 'adminPostNewProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/user/:userId/post', {
                templateUrl: 'views/post/templates/post-list.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:userId/post/new', {
                templateUrl: 'views/post/templates/post-chooser.view.client.html',
                controller: 'postNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

    function checkAdmin($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/')
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                console.log(currentUser);
                if (currentUser === '0'){
                    deferred.reject();
                    $location.url('/login');
                }else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();
