(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.createWebsite = createWebsite;

        function init() {
           websiteService
               .findAllWebsitesForUser(model.userId)
               .then(function (websites) {
                   model.websites = websites;
               })
        }
        init();

        function createWebsite (website) {
            if(typeof website === 'undefined') {
                model.error = "Website name required!";
                return;
            }
            websiteService
                .createWebsite(model.userId, website)
                .then(function (website) {
                    $location.url('/user/' + model.userId + '/website');
                });
        }
    }
}) ();
