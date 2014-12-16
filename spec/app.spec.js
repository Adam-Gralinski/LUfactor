/**
 * Created by gralinsa on 2014-12-15.
 */
describe('LUFactor', function(){
    beforeEach(module('LUFactor'));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('matrixSizeCtrl', {$scope: $scope});
    }));

    it('updates matrix', function() {
        expect($scope.spices.length).toBe(3);
    });
});