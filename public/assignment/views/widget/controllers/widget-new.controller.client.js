(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                  widgetService,
                                  $location, $sce) {

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

        function widgetType(type) {
            model.type = type;
        }


        function createWidget(pageId, widget) {
            if (model.type === 1){
                widget = {"widgetType": "", "pageId": "", "text": ""};
                widget.widgetType = "HEADING";
                console.log(widget);
            }
            if (model.type === 2){
                widget = {"widgetType": "", "pageId": "", "width": "",
                    "url": "" };
                widget.widgetType = "TEXT";
            }
            if (model.type === 3){
                widget = {"widgetType": "", "pageId": "", "width": "", "url": ""};
                widget.widgetType = "IMAGE";
            }
            if (model.type === 4){
                widget = {"widgetType": "", "pageId": "", "width": "",
                    "url": "" };
                widget.widgetType = "YOUTUBE";
            }
            widgetService
                .createWidget(pageId, widget)
                .then(function (widget) {
                    console.log(widget);
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                        model.pageId + '/widget/' + widget._id);
                });
        }
    }
}) ();
