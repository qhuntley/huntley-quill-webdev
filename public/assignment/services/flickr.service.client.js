(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "34a1ba41892b422c011b70b4e441491c";
        var secret = "703fcbf36de5f294";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();
