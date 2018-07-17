angular
    .module('PREPIEGGApp')
    .controller('gubernatura_distritosCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$window',
        '$location',
        'entidad',
        'encabezados',
        function ($rootScope,$scope,$state,$window,$location,entidad, encabezados) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;

            $scope.radio_gubernatura = 1;
            $scope.getVal=function(){
                if($scope.radio_gubernatura == 2)
                    $state.transitionTo('desktop.gubernatura_distritos_pp_ci');
            };
            $scope.reload= function(){
                $window.location.reload();	
            };

            $scope.win = -1;
            var mayor = 0;
            for(i = 0; i < 5; i++){
                if( parseFloat(entidad.resumen_entidad.porcentaje[i]) > mayor && parseFloat(entidad.resumen_entidad.porcentaje[i]) > 0){
                    mayor = parseFloat(entidad.resumen_entidad.porcentaje[i]);
                    console.log(mayor);
                    $scope.win = i;
                }
            }

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

             //Analitycs
             var path = $location.path(); 
             var name = $state.current.data.pageTitle; 
             // console.log("Ruta:" + path); console.log("Titulo: " + name); 
             gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);