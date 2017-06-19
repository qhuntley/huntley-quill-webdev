(function () {
    angular
        .module('MovieApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            // user routing
            .when('/', {
                templateUrl: 'home.html'
            })

            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginProjectController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerProjectController',
                controllerAs: 'model'
            })

            .when('/user-private', {
                templateUrl: 'views/user/templates/user-private-profile.view.client.html',
                controller: 'userPrivateProjectController',
                controllerAs: 'model'
            })

            .when('/user-public', {
                templateUrl: 'views/user/templates/user-public-profile.view.client.html',
                controller: 'userPublicProjectController',
                controllerAs: 'model'
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

            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileProjectController',
                controllerAs: 'model'
                /*resolve: {
                    currentUser: checkLoggedIn
                }*/
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

   /* function checkLoggedIn($q, $location, userProjectService) {
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
    }*/
})();
