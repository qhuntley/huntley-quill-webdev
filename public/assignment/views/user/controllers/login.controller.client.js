(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username required!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password required!';
                return;
            }

            userService
                //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.error = "Username " + username + " not found, please try again!";
            }

            function login(validUser) {
                if(validUser !== null) {
                    $location.url('/profile');
                }
                else {
                    model.error = "Username " + username + " not found, please try again!";
                }
            }
        };
    }
}) ();
