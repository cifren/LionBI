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
                        when('/reportdetails', {
                            name: 'reportDetails',
                            templateUrl: Routing.generate('lionbi_common_template', {templateName: encodeURIComponent('EarlsLionBiBundle:Admin/Report:report_details.html.twig')}),
                            controller: 'ReportCtrl'
                        })
                        .otherwise({
                            redirectTo: '/reportdetails'
                        });
            }
        ]);