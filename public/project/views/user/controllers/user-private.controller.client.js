(function () {
    angular
        .module('MovieApp')
        .controller('userPrivateProjectController', userPrivateProjectController);

    function userPrivateProjectController(currentUser, $location, userProjectService, $routeParams) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init(){
            // renderUser(currentUser);
        }
        init();

        //  function renderUser(user) {
        //    model.user = user;
        // }


        function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully!";
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
