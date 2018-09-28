/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams, $menu) {

        $scope.menu = $menu;
        $scope.alertActive = false;
        $scope.spin = false;
        $scope.eventButton = function(){
            alert();
        };

        $scope.showAlert = function(){
            $scope.alertActive = true;
        };

        $scope.showSpin = function(){
           $scope.spin = true;
           setTimeout(function(){
                $scope.spin = false;
                $scope.$apply();
           },2000);
        };

        $scope.ngSelectOptions = [
            {id:1,name:"item 1"},
            {id:2,name:"item 2"},
            {id:3,name:"item 3"}
        ];
        $scope.ngCheckboxOptions = [
            {id:1,name:"item 1"},
            {id:2,name:"item 2"},
            {id:3,name:"item 3"}
        ];
        $scope.ngRadiobuttonOptions = [
            {id:1,name:"item 1"},
            {id:2,name:"item 2"},
            {id:3,name:"item 3"}
        ];
        $scope.ngSelectModel = $scope.ngSelectOptions[0];


    };
    controller.$inject = ['$scope','$rootScope','$routeParams', '$menu'];
    angular.module('app').controller('UIController', controller);

})();