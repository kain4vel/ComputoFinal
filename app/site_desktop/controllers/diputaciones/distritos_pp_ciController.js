angular
    .module('PREPIEGGApp')
    .controller('diputaciones_distritos_pp_ciCtrl', [
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

            $scope.radio_diputaciones = 2;
            $scope.getVal=function(){
                if($scope.radio_diputaciones == 1)
                    $state.transitionTo('desktop.diputaciones_distritos', {id_ubicacion: $scope.distritos_cmb});
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