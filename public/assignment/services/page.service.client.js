(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        return {
            createPage: createPage,
            findPageByWebsiteId:findPageByWebsiteId,
            findPageById:findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    resultSet.push(pages[p]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function updatePage(pageId, page) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.push(index);
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

    }
})();
