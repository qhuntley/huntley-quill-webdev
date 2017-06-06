(function () {
    angular
        .module('wbdvDirectives', ['ngRoute'])
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {

        function linkFunction(scope, element) {
            $(element).sortable({
                axis: 'y'
            });

        }

        return {
            //templateUrl:"/page/:pageId/widget?initial=index1&final=index2",
            link: linkFunction
        }
    };

})();
