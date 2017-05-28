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
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function createWebsite (website) {
            websiteService.createWebsite(model.userId, website);
            $location.url('/user/' + model.userId + '/website');
        }

        function updateWebsite(websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }
    }
}) ();
