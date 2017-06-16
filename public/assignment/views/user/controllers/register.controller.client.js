(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        //implementation
        function  register(username, password, password2) {

            if (password !== password2 || password === null) {
                model.error = "Password mismatch!";
                return;
            }

            if (username === null || username === '') {
                model.error = 'Username required!';
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function () {

                        model.error = "Username is not available";
                    },

                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        userService
                            .register(newUser)
                            .then(function (newUser) {
                                $location.url('/profile');
                            });
                    })
        }
    }
}) ();
