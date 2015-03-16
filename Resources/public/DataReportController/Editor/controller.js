var editorControllers = angular.module('editorControllers', []);

editorControllers.controller('sqlCtrl', ['$scope', '$http', '$routeParams',
    function sqlCtrl($scope, $http, $routeParams) {
        var id = $routeParams.id;
        if (id) {
            var url = Routing.generate('lionbi_dataReport_getJsonDataReport', {id: id});
            var dataReport;
            $http.get(url).success(function (data) {
                $scope.dataReport =  data.data;
            });
            $scope.dataReport = dataReport;
        } else {
            $scope.dataReport = {};
            $scope.dataReport.lnbDataReportType = 1;
        }

        $scope.submitForm = function () {
            var url = Routing.generate('lionbi_dataReport_saveDataReport', {dataReport: $scope.dataReport});
            $http
                    .post(url)
                    .success(function (data) {
                        $scope.alertStatus = "success";
                        $scope.alertMsg = "Successfully saved";
                        $scope.dataReport =  data.data;
                        setTimeout(function () {
                            $scope.alertStatus = null;
                        }, 5000);
                    });
        };
    }
]);