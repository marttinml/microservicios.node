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

        $('#cardd1').inputMask( {mask:'●',type:'pass'});
        $('#cardd2').inputMask( {mask:'●',type:'pass'});
        $('#cardd3').inputMask( {mask:'●',type:'pass'});
        $('#cardd4').inputMask( {mask:'●',type:'pass'});
        $('#cardd5').inputMask( {mask:'●',type:'pass'});
        $('#cardd6').inputMask( {mask:'●',type:'pass'});

        $('.input-card').keyup(function(){
            if($(this).val().length ===1){
                $(this).next('.input-card').focus();
            }
            if(!$(this).next('.input-card').length){
                $('.input-card2')[0].focus();
            }
        });
        $('.input-card2').keyup(function(){
            if($(this).val().length ===1){
                $(this).next('.input-card2').focus();
            }
            if(!$(this).next('.input-card').length){
                // Code
            }
        });
    
    };
    controller.$inject = ['$scope','$rootScope','$routeParams', '$compile'];
    angular.module('app').controller('RecuperarPasscodeController', controller);

})();