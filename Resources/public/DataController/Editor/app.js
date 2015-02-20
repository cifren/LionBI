var reportEditor = angular.module('reportEditor', [
    'ngResource',
    'ngRoute',
    'editorControllers'
]);

reportEditor
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                        //advanced search list
                        when('/sqlDataDetails', {
                            name: 'sqlDataDetails',
                            //templateUrl: Routing.generate('lionbi_common_template', {templateName: encodeURIComponent('EarlsLionBiBundle:Admin/Data:sql_editor.html.twig')}),
                            controller: 'sqlCtrl'
                        })
                        .otherwise({
                            redirectTo: '/sqlDataDetails'
                        });
            }
        ]);