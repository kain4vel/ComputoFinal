angular
    .module('PREPIEGGApp')
    .controller('movil_ayutamiento_seccion_municipioCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$stateParams',
        '$window',
        '$location',
        '$state',
        'cmb_secciones',
        'cmb_municipios',
        'encabezados',
        'entidad',
        function ($rootScope, $scope, $timeout, $stateParams, $window,$location,$state, cmb_secciones, cmb_municipios, encabezados, entidad) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;
            $scope.valorMunicipio = $stateParams.id_ubicacion;

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
            
            $scope.cmb_secciones_data = cmb_secciones;
            $scope.cmb_secciones_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                onInitialize: function (selectize) {
                    selectize.setValue(1);
                }
            };

            $scope.reload = function () {
                $window.location.reload();
            };

             //Analitycs
             var path = $location.path(); 
             var name = $state.current.data.pageTitle; 
             gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);