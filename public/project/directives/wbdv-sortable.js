(function () {
    angular
        .module('wbdvDirectives',['ngRoute'])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable(widgetService) {
        var initial = -1;
        var final = -1;
        function linkFunction(scope, element) {
            jQuery(element).sortable({
                axis: 'y' ,
                start: function(event, ui) {
                    initial = (jQuery(ui.item).index)();
                },
                stop: function(event, ui) {
                    final = (jQuery(ui.item).index)();
                    widgetService
                        .sortWidgets(initial, final);
                } });
        }
        return {
            link: linkFunction
        }
    }
})();
