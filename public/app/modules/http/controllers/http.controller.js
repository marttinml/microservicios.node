/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams, $test, $menu) {
        //code
        $scope.menu = $menu;
        $scope.homeList     = [];
        $scope.testId       = "";
        $scope.name         = "";
        $scope.description  = "";

        $scope.get = function(){
            var home = new $test();
            home.$get({testId:$scope.testId}).then(function(home){
                $scope.homeList = [home];
            },$scope.showAlert);
        };
        $scope.getAll = function(){
            $scope.homeList = $test.getAll(function(){
                console.log($scope.homeList);
            },$scope.showAlert);
        };
        $scope.save = function(){
            var home = new $test();
            home.name = $scope.name;
            home.description = $scope.description;
            console.log(home);
            home.$save().then(function(home){
                console.log(home);
                $scope.getAll();
            },$scope.showAlert);
        };
        $scope.update = function(){
            var home = new $test();
            home.name = $scope.name;
            home.description = $scope.description;
            home.$update({testId:$scope.testId}).then(function(home){
                console.log(home);
                $scope.getAll();
            },$scope.showAlert);
        };
        $scope.delete = function(){
            var home = new $test();
            home.$delete({testId:$scope.testId} ).then(function(home){
                console.log(home);
                $scope.getAll();
            },$scope.showAlert);
        };

        $scope.showAlert = function(e){
            $scope.serverError = e;
            $scope.alertActive = true;
        };
    };
    controller.$inject = ['$scope','$rootScope','$routeParams','$test', '$menu'];
    angular.module('app').controller('HTTPController', controller);

})();