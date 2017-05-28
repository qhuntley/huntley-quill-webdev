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

        model.createWidget = createWidget;
        model.widgetByType = widgetByType;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        model.widgetType === null;
        model.type;

        function widgetByType(type) {
            model.widgetType === type;
        }
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
            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.user_id + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
            console.log(model.widgets);
        }
    }
}) ();
