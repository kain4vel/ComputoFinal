angular
    .module('PREPIEGGApp')
    .controller('gubernatura_seccion_distritoCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$stateParams',
        '$state',
        '$interval',
        '$http',
        '$window',
        '$location',
        'cmb_distritos',
        'entidad',
        'encabezados',
        function ($rootScope,$scope, $timeout, $stateParams,$state,$interval,$http, $window,$location, cmb_distritos, entidad, encabezados) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            $scope.cmb_distritos_data = cmb_distritos;
            $scope.cmb_distritos_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'titulo',
                onInitialize: function (selectize) {
                    selectize.setValue($stateParams.id_ubicacion);
                }
            };

            $scope.reload= function(){
                $window.location.reload();	
            };

            $scopeentidad1 = new Object();
            

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
            
            // var promise = $interval(function () {
            //     $http({ method: 'GET', url: 'http://localhost:8080/Publicacion/data/info/gubernatura/gubernatura_info.json' })
            //             .then(function (data) {
            //                 $scope.entidad1['seccion_distrito'] = data.data.seccion_distrito;
            //                 $scope.entidad1['resumen'] = data.data.resumen;
                           
            //             });
            //     $state.transitionTo($state.current, $stateParams, {reload: true, inherit: true, notify: true });
            //     $scope.entidad1 = $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
            //                     .then(function (data) {
            //                         var entidad = {};
            //                         entidad['resumen_entidad'] = data.data.resumen_entidad;
            //                         entidad['resumen_gubernatura'] = data.data.resumen_gubernatura;
            //                         entidad['resumen'] = data.data.resumen;
            //                         return entidad;
            //                     });
                
            // }, 10000);

            // $scope.$on('$destroy', function () {
            //     $interval.cancel(promise);
            // });


            // $state.transitionTo($state.current, $stateParams, {
            //     reload: true,
            //     inherit: false,
            //     notify: true
            // });


        }
    ]);