$(document).ready(function(){
    $('.about_me').on('click', function(){
        $("#about_me--dialog").dialog();
    });
});


var LUFactor = angular.module('LUFactor', []);

LUFactor.service('matrixResources',function(){
        matrix ={
            size : 3,
            array : []
        };
        return matrix;
});

LUFactor.controller('lufCtrl', ['$scope', function($scope){

}]);

LUFactor.controller('matrixSizeCtrl', ['$scope', 'matrixResources', function($scope, matrixResources){
        $scope.matrix = matrixResources;

        $scope.update = function(sizeForm) {
            matrixResources.size = angular.copy(sizeForm.size);
        };
        $scope.reset = function() {
            $scope.matrix = {};
        };
        $scope.reset();
}]);

LUFactor.controller('matrixValCtrl', ['$scope', 'matrixResources', function($scope, matrixResources){
    $scope.matrix = matrixResources;
    $scope.len = function(){
        array =[];
        for (i=0; i<matrix.size;i++){
            array.push(i);
        }
        return array;
    };
    $scope.refresh = function(){
      $scope.$apply();
    };
    $scope.draw = function(){

    };
}]);



