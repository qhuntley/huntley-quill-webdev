(function () {
    angular
        .module('MovieApp')
        .controller('adminUsersProjectController', adminUsersProjectController);

    function adminUsersProjectController(userProjectService, $location, $routeParams) {
        var model = this;
        model.userId = $routeParams['userId'];


        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.createUser = createUser;
        model.updateUser = updateUser;
       // model.selectUsername = selectUsername;
        model.goBack = goBack;

        function init() {
            findAllUsers();
        }
        init();

        function goBack() {
            window.history.back();
        }

        function deleteUser(user) {
            userProjectService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function createUser(user) {
                user.password = "password";
                userProjectService
                    .createUser(user)
                    .then(findAllUsers);
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function findAllUsers() {
            userProjectService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

       /* function selectUsername(username) {
            console.log(userId);
            $location.url('/user/'+ userId + '/profile-public');
        }*/

    }
})();