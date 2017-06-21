(function () {
    angular
        .module('MovieApp')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userProjectService, $routeParams, NgTableParams) {


        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;

        function init(){
           // var self = this;
            //access from dataset
            //article.dataset.user.reviews;
            var data = model.user.reviews;
            model.tableParams = new NgTableParams({}, { dataset: data});
        }
        init();

        function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully!";
                });
        }

        function unregister() {
            userProjectService
                .unregister()
                .then(function () {
                    $location.url('/login');
                }, function (err) {
                    console.log(err);
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