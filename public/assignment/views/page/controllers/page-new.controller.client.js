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

        function createPage (page) {
            pageService
                .createPage(model.websiteId, page)
                .then(function (page) {
                    $location.url('/user/' + model.userId + '/website/' + page.websiteId + '/page');
                });
        }
    }
}) ();
