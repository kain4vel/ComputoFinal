angular
    .module('PREPIEGGApp')
    .controller('ayutamiento_municipios_detalle_pp_ciCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$location',
        '$state',
        '$stateParams',
        '$window',
        'cmb_municipios',
        'entidad',
        'encabezados',
        function ($rootScope, $scope, $timeout, $location, $state, $stateParams, $window, cmb_municipios, entidad, encabezados) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;
            $scope.cmb_municipios_data = cmb_municipios;
            $scope.cmb_municipios_config = {
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

             //Analitycs
             var path = $location.path(); 
             var name = $state.current.data.pageTitle; 
             gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);