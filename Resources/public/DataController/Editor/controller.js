var editorControllers = angular.module('editorControllers', []);

//var submitForm = function submitForm() {
//
//};
var changeType = function changeType() {

};

editorControllers.controller('sqlCtrl', ['$scope', '$http',
    function sqlCtrl($scope, $http) {
        $scope.type = "sql";
        $scope.changeType = changeType;
        $scope.submitForm = function ($http, $scope) {
            var url = Routing.generate('lionbi_dataReport_saveDataReport', $scope.dataReport);
            $http.post(url)
                    .success(function () {
                        $scope.alertStatus = "success";
                        $scope.alertMsg = "Successfully saved";
                        setTimeout(function(){ $scope.alertStatus = null; }, 5000);
                    })
                    ;
        };
    }
]);