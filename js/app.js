$(document).ready(function(){
    $('.about_me').on('click', function(){
        $("#about_me--dialog").dialog();
        
    });
    
});


var LUFactor = angular.module('LUFactor', []);

LUFactor.controller('lufStartCtrl', ['$scope', function($scope){
    $scope.greeting=""
    
}]);