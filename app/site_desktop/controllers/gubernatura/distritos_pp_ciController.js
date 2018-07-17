angular
    .module('PREPIEGGApp')
    .controller('gubernatura_distritos_pp_ciCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$window',
        '$location',
        'entidad',
        'encabezados',
        function ($rootScope,$scope,$state,$window,$location, entidad,encabezados) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            $scope.radio_gubernatura = 2;
            $scope.getVal=function(){
                if($scope.radio_gubernatura == 1)
                    $state.transitionTo('desktop.gubernatura_distritos');
            };
            $scope.reload= function(){
                $window.location.reload();	
            };
            

            $("body").floatingSocialShare({
                buttons: ["facebook", "whatsapp", "twitter","mail"],
                twitter_counter: true,
                text: {
                    'facebook': 'Compartir en Facebook',
                    'whatsapp': 'Compartir en Whatsapp',
                    'twitter': 'Compartir en Twitter',
                    'mail': 'Compartir por E-mail'
                  },
                place: "top-right"
              });

        }
    ]);