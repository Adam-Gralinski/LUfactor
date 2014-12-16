$(document).ready(function () {
    $('.about_me').on('click', function () {
        $("#about_me--dialog").dialog();
    });

});


var LUFactor = angular.module('LUFactor', []);

LUFactor.service('matrixResources', function () {
    this.matrix = {
        size: 0,
        array: [],
        draw: function(){
            return numeric.LU(this.array);
        }
    };
});


LUFactor.controller('matrixSizeCtrl', ['$scope', 'matrixResources', function ($scope, matrixResources) {
    $scope.update = function (sizeForm) {
        return matrixResources.matrix.size = angular.copy(sizeForm.size);
    };
    $scope.reset = function () {
        return matrixResources.matrix.size = 0;
    };
    $scope.reset();
}]);

LUFactor.controller('matrixValCtrl', ['$scope', 'matrixResources', function ($scope, matrixResources) {
    $scope.array = [];
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
        $scope.array = [];
    };
    $scope.show = function(){
        $scope.tmp = matrixResources.matrix;
    };
    $scope.draw = function () {
        $scope.change = $.map($scope.array, function(value) {
            return [
                $.map(value, function(value1) {
                return [value1];
            })]
        });
        matrixResources.matrix.array = $scope.change;
        $scope.result = matrixResources.matrix.draw();
    };
}]);

