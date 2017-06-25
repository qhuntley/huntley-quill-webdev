(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   pageService,
                                   $location) {

        var model = this;
        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams.pageId;


        model.createPage = createPage;
        model.updatePage =  updatePage;
        model.deletePage =  deletePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });

            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                });
        }
        init();

        function createPage (page) {
            pageService
                .createPage(model.websiteId, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });
        }

        function updatePage(pageId, page) {
            if(page.name === "") {
                model.error = "Page name required!";
                return;
            }
            pageService
                .updatePage(pageId, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });
        }

        function deletePage(pageId, page) {
            pageService
                .deletePage(pageId, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId  + '/page');
                });
        }
    }
}) ();
