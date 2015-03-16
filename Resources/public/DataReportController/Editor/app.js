var reportEditor = angular.module('reportEditor', [
    'ngResource',
    'ngRoute',
    'editorControllers'
]);

reportEditor
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider.
                        //advanced search list
                        when('/sqlDataDetails', {
                            name: 'sqlDataDetails',
                            templateUrl: Routing.generate('lionbi_dataReport_sqlEditor'),
                            controller: 'sqlCtrl'
                        }).
                        //advanced search list
                        when('/sqlDataDetails/:id', {
                            name: 'sqlDataDetails&id',
                            templateUrl: Routing.generate('lionbi_dataReport_sqlEditor'),
                            controller: 'sqlCtrl'
                        })
                        .otherwise({
                            redirectTo: '/sqlDataDetails'
                        });
            }
        ]);