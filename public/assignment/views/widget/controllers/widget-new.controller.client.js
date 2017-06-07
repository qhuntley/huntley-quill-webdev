(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                  widgetService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        model.createWidget = createWidget;
        model.widgetType = widgetType;
        model.type;

        function widgetType(type) {
            model.type = type;
        }

        function createWidget(pageId, widget) {

            if (model.type === 1){
                widget = {"_id": "", "widgetType": "", "pageId": "", "text": ""};
                widget.widgetType = "HEADING";
            }
            if (model.type === 2){
                widget = { "_id": "", "widgetType": "", "pageId": "", "width": "", "url": ""};
                widget.widgetType = "IMAGE";
            }
            if (model.type === 3){
                widget = { "_id": "", "widgetType": "", "pageId": "", "width": "",
                    "url": "" };
                widget.widgetType = "YOUTUBE";
            }
            widgetService
                .createWidget(pageId, widget)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + pageId + '/widget/' + widget._id);
                });
        }
    }
}) ();
