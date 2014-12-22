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
            this.result = this.LU(this.array, this.size);
            console.log(this.result);
            return this.result;
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
        },
        LU : function(A, dimmension){
                //Workspace initialization 
                var workspace = {
                    n: dimmension,
                    A: A,
                    L: [],
                    U: []
                };
                // Fill U matrix with 0 and L with Identity matrix.
                for(var x=0; x<workspace.n;x++){
                            workspace.L.push([]);
                            workspace.U.push([]);
                }
                for(var x=0; x<workspace.n; x++){
                    for(var y=0; y<workspace.n; y++){
                        if(x===y){
                            workspace.L[x].push(1)
                        }else{
                            workspace.L[x].push(0);
                        }
                        workspace.U[x].push(0);
                    }
                }
                // Proper algorithm
                for (var j = 1; j <= workspace.n; ++j) {
                    var i, k;
                    for (var i = 1; i < (j + 1); ++i) {
                        var s1 = 0;
                        for (k = 1; k < i; ++k) {
                            s1 += workspace.U[k-1][j-1] * workspace.L[i-1][k-1];
                        }
                        workspace.U[i-1][j-1] = workspace.A[i-1][j-1] - s1;
                    }
                    for (i = j + 1; i <= workspace.n; ++i) {
                        var s2 = 0;
                        for (k = 1; k < j; ++k) {
                            s2 += workspace.U[k-1][j-1] * workspace.L[i-1][k-1]
                        }
                        var dividend = workspace.A[i-1][j-1] - s2;
                        var divisor = workspace.U[j-1][j-1];
                        var res = dividend / divisor;
                        workspace.L[i-1][j-1] = res;
                    }
                }
                return workspace;
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

