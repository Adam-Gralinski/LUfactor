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
        initMatrix: function(){
            this.array = [];
            for(var x=0; x<this.size;x++){
                this.array.push([]);
            }
            for(var x=0; x<this.size; x++){
                for(var y=0; y<this.size; y++){
                    this.array[x].push(null);
                }
            }
        },
        draw: function(){
            //return numeric.cLU(this.array);
        },
        clearArray: function(){
           this.initMatrix();
        },
        randomize: function(){
            this.initMatrix();
            for(var x=0; x<this.size; x++){
                for(var y=0; y<this.size; y++){
                    this.array[x][y] = Math.floor(Math.random()*50+1);
                }
            }
        }
    };
});


LUFactor.controller('matrixSizeCtrl', ['$scope', 'matrixResources', function ($scope, matrixResources) {
    $scope.update = function (sizeForm) {
        return matrixResources.matrix.size = angular.copy(sizeForm.size);
    };
    $scope.reset = function () {
        matrixResources.matrix.clearArray();
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
        var tmpArray = [];
        for (var i = 0; i < matrixResources.matrix.size; i++) {
            tmpArray.push(i);
        }
        return tmpArray;
    };
    $scope.refresh = function () {
        return $scope.array = [];
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
    $scope.randomize = function(){
        matrixResources.matrix.randomize();
        $scope.array = matrixResources.matrix.array;
    }
}]);

