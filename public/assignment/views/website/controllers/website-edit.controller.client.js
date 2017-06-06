(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;


        model.createWebsite = createWebsite;
        model.updateWebsite =  updateWebsite;
        model.deleteWebsite =  deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });

            websiteService
                .findWebsiteById(model.websiteId)
                .then(function(website) {
                    model.website = website;
                })
        }
        init();

        function createWebsite (website) {
            websiteService
                .createWebsite(model.userId, website)
                .then(function(website) {
                    $location.url('/user/' + model.userId + '/website');
                })

        }

        function updateWebsite(website) {
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function(response) {
                    $location.url('/user/' + model.userId + '/website');
                })

        }

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                })
        }

    }
}) ();
