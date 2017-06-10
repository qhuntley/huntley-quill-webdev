(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];


        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });
        }
        init();
    }
}) ();
