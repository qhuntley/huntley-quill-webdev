(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                   widgetService,
                                   $location,$sce) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;
        model.pageId = $routeParams.pageId;


        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets) {
                    model.widgets = widgets;
                });

            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }
        init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function updateWidget(widgetId, widget) {
            widgetService
                .updateWidget(widgetId, widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function() {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
    }
}) ();
