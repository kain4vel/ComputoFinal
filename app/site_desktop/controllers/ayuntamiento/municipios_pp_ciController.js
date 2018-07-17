angular
    .module('PREPIEGGApp')
    .controller('ayuntamientos_municipios_pp_ciCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$window',
        '$location',
        'cmb_municipios',
        'entidad',
        'encabezados',
        function ($rootScope,$scope,$state,$stateParams,$window,$location,cmb_municipios,entidad,encabezados) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            $scope.cmb_municipios_data = cmb_municipios;
            $scope.cmb_municipios_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'titulo',
                onInitialize: function(selectize){
                    selectize.setValue($stateParams.id_ubicacion); 
                }
            }; 
            $scope.radio_municipios = 2;
            $scope.getVal=function(){
                if($scope.radio_municipios == 1)
                $state.transitionTo('desktop.ayuntamientos_municipios', {id_ubicacion: $scope.municipios_cmb});
            }
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

            //Analitycs
            var path = $location.path(); 
            var name = $state.current.data.pageTitle; 
            // console.log("Ruta:" + path); console.log("Titulo: " + name); 
            gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });

        }
    ]);