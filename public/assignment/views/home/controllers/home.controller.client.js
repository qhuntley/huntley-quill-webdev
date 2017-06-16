(function () {
    angular
        .module('WebAppMaker')
        .controller('homeController', homeController);

    function homeController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }
})();