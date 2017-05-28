(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        model.deleteUser = deleteUser;

        function deleteUser(userId) {
            userService.deleteUser(model.user._id);
            $location.url('/login');
        }

    }
}) ();