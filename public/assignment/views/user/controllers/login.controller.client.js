(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                .findUserByUsername(username)
                .then(login, handleError);

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again!";
            }

            function login(validUser) {
                if(validUser !== null) {
                    $location.url('/user/' + validUser._id);
                }

                else if(username !== null) {
                    model.message = "Password incorrect, please try again!";
                }
                else {
                    model.message = "Username " + username + " not found, please try again!";
                }
            }
        };
    }
}) ();
