(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        //implementation
        function  register(username, password, password2) {

            if(password !== password2) {
                model.error = "Password mismatch!";
                return;
            }

            userService
                .findUserByUsername(username)
                .then (function () {

                model.error = "Username is not available";
            },

            function () {
                var user = {
                    username: username,
                    password: password
                };
                return userService
                    .createUser(user);
                }
                )
                .then(function (user) {
                    $location.url('/user/' + user._id);
            });
        }
    }
}) ();
