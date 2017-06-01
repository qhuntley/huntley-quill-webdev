(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            var found = userService.findUserByUsername(username);

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again!";
            }

            function login(validUser) {
                if(validUser !== null) {
                    $location.url('/user/' + found._id);
                }

                else if(found !== null) {
                    model.message = "Password incorrect, please try again!";
                }
                else {
                    model.message = "Username " + username + " not found, please try again!";
                }
            }
        };
    }
}) ();
