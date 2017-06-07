(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, widgetService, $location, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }
        init();

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_q.jpg";

            model.widget.url = url;

            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + '/widget/' + model.widgetId);
                });
        }

        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }

    }
}) ();
