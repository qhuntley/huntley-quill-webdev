(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        //implementation
        function  register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username required!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password required!';
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'Verify password required!';
                return;
            }

            if (password !== password2) {
                model.error = "Password mismatch!";
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
