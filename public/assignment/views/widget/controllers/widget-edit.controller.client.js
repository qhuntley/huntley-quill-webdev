(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                   widgetService,
                                   $location) {

        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.widgetId = $routeParams.widgetId;
        model.pageId = $routeParams.pageId;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getWidgetEditorForType = getWidgetEditorForType;

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

        function updateWidget(widgetId, widget) {
            widgetService
                .updateWidget(widgetId, widget)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function(response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

        function getWidgetEditorForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'-edit.view.client.html';
        }
    }
}) ();
