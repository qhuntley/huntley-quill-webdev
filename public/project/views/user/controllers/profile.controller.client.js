(function () {
    angular
        .module('MovieApp')
        .controller('profileProjectController', profileProjectController);

    function profileProjectController(currentUser, $location, $routeParams, userProjectService) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;
        /* userService
         .findUserById(userId)
         .then(renderUser);
         */
        function init(){
            // renderUser(currentUser);
        }
        init();

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;


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
                    }
                );
        }
    }
}) ();
