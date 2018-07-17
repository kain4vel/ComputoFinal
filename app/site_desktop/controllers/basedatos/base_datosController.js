angular
    .module('PREPIEGGApp')
    .controller('base_datosCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        'menu_lateral',
        'basedatos',
        function ($rootScope,$scope,$timeout,menu_lateral,basedatos) {
            var flag = false;
            var scroll;
            $(window).scroll(function(){
                scroll = $(window).scrollTop();
                if(scroll > 85){
                    if(!flag){
                        $("#menu_lateral").css({"top": "68px","position":"fixed", "right":"34px"});
                        flag = true;
                    }
                }else{
                    if(flag){
                        $("#menu_lateral").css({"top": "197px","position":"absolute", "right":"34px"});
                        flag = false;
                    }
                }
            });
            $scope.basedatos = basedatos.nombreBD;
            $scope.menu_lateral = menu_lateral;

        }
    ]);