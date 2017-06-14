(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again!";
            }

            function login(validUser) {
                if(validUser !== null) {
                    $location.url('/user/' + validUser._id);
                }
                else {
                    model.message = "Username " + username + " not found, please try again!";
                }
            }
        };
    }
}) ();
