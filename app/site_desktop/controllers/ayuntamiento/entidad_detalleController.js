angular
    .module('PREPIEGGApp')
    .controller('ayuntamientos_entidad_detalleCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$window',
        '$location',
        'encabezados',
        'entidad',
        function ($rootScope,$scope,$state,$window,$location,encabezados,entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            
            $scope.radio_municipios = 1;
            $scope.getVal=function(){
                if($scope.radio_municipios == 2)
                    $state.transitionTo('desktop.ayuntamientos_entidad_detalle_pp_ci');
            }

            $scope.reload= function(){
                $window.location.reload();	
            };

            $scope.win = [];
            for(i =0; i < 46; i++){
                var band = 0;
                for(j=0; j < 10 ; j++ ){
                    if(entidad.municipios_partido[i] == encabezados[j].nombrecorto){
                        $scope.win.push(j);
                        band = 1;
                    }
                }
                if(!band){
                    $scope.win.push(-1);
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