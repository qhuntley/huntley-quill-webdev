(function () {
    angular
        .module('MovieApp')
        .controller('userPublicProjectController', userPublicProjectController);

    function userPublicProjectController($location, userProjectService) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;
    }

})();