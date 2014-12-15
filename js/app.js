$(document).ready(function () {
    $('.about_me').on('click', function () {
        $("#about_me--dialog").dialog();
    });

});


var LUFactor = angular.module('LUFactor', []);

LUFactor.service('matrixResources', function () {
    this.matrix = {
        size: 0,
        array: []
    };
});


LUFactor.controller('matrixSizeCtrl', ['$scope', 'matrixResources', function ($scope, matrixResources) {
    $scope.update = function (sizeForm) {
        matrixResources.matrix.size = angular.copy(sizeForm.size);
    };
    $scope.reset = function () {
        matrixResources.matrix = {};
    };
    $scope.reset();
}]);

LUFactor.controller('matrixValCtrl', ['$scope', 'matrixResources', function ($scope, matrixResources) {
    $scope.showMe = function(){
        return matrixResources.matrix.size
    };
    $scope.len = function () {
        var array = [];
        for (var i = 0; i < matrixResources.matrix.size; i++) {
            array.push(i);
        }
        return array;
    };
    $scope.refresh = function () {
        $scope.$apply();
    };
    $scope.draw = function () {

    };
}]);

