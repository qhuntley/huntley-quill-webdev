(function () {
    angular
        .module('MovieApp')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userProjectService, $routeParams) {


        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        // implementation
        function updateUser(userId, user) {
            if (user.username === ""){
                model.message = "Username required";
                return;
            }
            userProjectService
                .updateUser(userId, user)
                .then(function () {
                    model.message = "User updated successfully";
                }, function(error){

                });
        }

        function deleteUser(id) {
            userProjectService
                .deleteUser(id)
                .then(function () {
                    $location.url('/');
                });
        }
        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
}) ();