angular
    .module('PREPIEGGApp')
    .controller('diputaciones_distritosCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$window',
        '$location',
        'cmb_distritos',
        'encabezados',
        'entidad',
        function ($rootScope,$scope,$state,$stateParams,$window,$location,cmb_distritos,encabezados,entidad) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;

            $scope.cmb_distritos_data = cmb_distritos;
            $scope.cmb_distritos_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'titulo',
                onInitialize: function(selectize){
                    selectize.setValue($stateParams.id_ubicacion); 
                }
            };
            $scope.radio_diputaciones = 1;
            $scope.getVal=function(){
                if($scope.radio_diputaciones == 2)
                    $state.transitionTo('desktop.diputaciones_distritos_pp_ci', {id_ubicacion: $scope.distritos_cmb});
            };
            
            $scope.reload= function(){
                $window.location.reload();	
            };
            
            $scope.win = -1;

            $scope.searchWin = function(idUbicacion){
                if(idUbicacion !=""){
                    $scope.win = -1;
                    var en = encabezados.filter(i => i.IDUBICACION == idUbicacion )[0].DATA;
                    for(j=0; j < en.length ; j++ )
                        if(entidad.municipios_partido[idUbicacion - 47] == en[j].nombrecorto)
                            $scope.win = j;
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