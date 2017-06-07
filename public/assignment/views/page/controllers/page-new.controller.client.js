(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();
        function createWebsite (website) {
            //website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (website) {
                    $location.url('/user/' + model.userId + '/website');
                });
        }

        function createPage (websiteId, page) {
            pageService
                .createPage(websiteId, page)
                .then(function (page) {
                    $location.url('/user/' + model.userId + '/website/' + websiteId + '/page');
                });
        }
    }
}) ();
