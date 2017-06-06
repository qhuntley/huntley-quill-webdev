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
            //website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                });
        }
    }
}) ();
