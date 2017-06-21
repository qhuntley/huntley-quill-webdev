(function () {
    angular
        .module('MovieApp')
        .controller('adminUsersProjectController', adminUsersProjectController);

    function adminUsersProjectController(userProjectService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        }
        init();

        function deleteUser(user) {
            userProjectService
                .deleteUser(user._id)
                .then(findAllUsers);
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
    }
})();