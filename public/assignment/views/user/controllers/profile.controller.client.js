(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        var userId = $routeParams['userId'];

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }

        model.deleteUser = deleteUser;

        function deleteUser(userId) {
            userService.deleteUser(model.user._id);
            $location.url('/login');
        }

    }
}) ();