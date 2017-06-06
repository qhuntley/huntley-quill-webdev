(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService($http) {

        return {
            createPage: createPage,
            findPageByWebsiteId:findPageByWebsiteId,
            findPageById:findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            var url = "/api/assignment/website/" + websiteId + "/" + page;
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
            //page._id = (new Date()).getTime() + "";
            //page.websiteId = websiteId;
            //pages.push(page);
        }



        function findPageByWebsiteId(websiteId) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

       //     var resultSet = [];
         //   for(var p in pages) {
           //     if (pages[p].websiteId === websiteId) {
             //       resultSet.push(pages[p]);
               // }
            //}
            //return resultSet;
        //}

        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
           // return pages.find(function (page) {
            //    return page._id === pageId;
            //});
        }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
            //var page = pages.find(function (page) {
            //    return page._id === pageId;
            //});
            //var index = pages.indexOf(page);
            //pages.push(index);
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            //var page = pages.find(function (page) {
           //     return page._id === pageId;
           // });
           // var index = pages.indexOf(page);
           // pages.splice(index, 1);
        }

    }
})();
