angular
    .module('PREPIEGGApp')
    .controller('diputaciones_seccion_distritoCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$state',
        '$window',
        '$location',
        'cmb_distritos',
        'encabezados',
        'entidad',
        function ($rootScope,$scope,$stateParams,$state,$window,$location,cmb_distritos,encabezados,entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            
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