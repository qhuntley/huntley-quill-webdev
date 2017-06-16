(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

       /* userService
            .findUserById(userId)
            .then(renderUser);
*/
       function init(){
          // renderUser(currentUser);
       }
       init();

      //  function renderUser(user) {
        //    model.user = user;
       // }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                   $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully!";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
}) ();