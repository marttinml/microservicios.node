/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams, $compile) {
        $scope.info = { titulo: '', career: ''};

        $scope.getInfo = function(){
            $scope.info = { titulo: 'BIENVENIDO A', career: 'UNEFON', color: 'yellow'};
        };

        $scope.getInfo();

        $('#card1').inputMask( {mask:'●',type:'pass'});
        $('#card2').inputMask( {mask:'●',type:'pass'});
        $('#card3').inputMask( {mask:'●',type:'pass'});
        $('#card4').inputMask( {mask:'●',type:'pass'});
        $('#card5').inputMask( {mask:'●',type:'pass'});
        $('#card6').inputMask( {mask:'●',type:'pass'});

        $('.input-card').keyup(function(){
            if($(this).val().length ===1){
                $(this).next('.input-card').focus();
            }
            if(!$(this).next('.input-card').length){
                console.log($(this).val());
                if(Number($(this).val()) === 1){
                    location.href = '#/cartera'
                }
                
            }
        });
    
    };
    controller.$inject = ['$scope','$rootScope','$routeParams', '$compile'];
    angular.module('app').controller('PasscodeController', controller);

})();