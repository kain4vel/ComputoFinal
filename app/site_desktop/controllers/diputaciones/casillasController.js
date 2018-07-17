angular
    .module('PREPIEGGApp')
    .controller('diputaciones_casillasCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        '$location',
        'distritos_secciones',
        'entidad',
        'cmb_distritos',
        function ($rootScope,$scope,$window,$location,distritos_secciones,entidad,cmb_distritos) {
            $scope.entidad = entidad;
            $scope.cmb_distritos_data = cmb_distritos;
            $scope.cmb_distritos_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'nombre',
                onInitialize: function(selectize){
                    selectize.setValue(47); 
                },
                onChange: function(value) {
                    var info = distritos_secciones.filter(i => i.IDUBICACION == value )[0].Secciones[0].IDSECCION;
                    $scope.secciones_cmb = info;
                }
            }; 

            $scope.cmb_secciones_data = distritos_secciones;
            $scope.cmb_secciones_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                onInitialize: function(selectize){
                    selectize.setValue(752); 
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