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
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function createPage (page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + page.websiteId + '/page');
        }

        function updatePage(pageId, page) {
            pageService.updatePage(pageId, page);
            $location.url('/user/' + model.userId + '/website/' + page.websiteId + '/page');
        }

        function deletePage(pageId, page) {
            pageService.deletePage(pageId, page);
            $location.url('/user/' + model.userId + '/website/' + page.websiteId  + '/page');
        }
    }
}) ();
