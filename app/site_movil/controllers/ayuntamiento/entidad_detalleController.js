angular
    .module('PREPIEGGApp')
    .controller('movil_ayuntamientos_entidad_detalleCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$location',
        '$state',
        '$window',
        'encabezados',
        'entidad',
        function ($rootScope, $scope, $timeout,$location, $state, $window, encabezados, entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;

            $scope.radio_municipios = 1;
            $scope.getVal = function () {
                if ($scope.radio_municipios == 2)
                    $state.transitionTo('desktop.ayuntamientos_entidad_detalle_pp_ci');
            }

            $scope.reload = function () {
                $window.location.reload();
            };

             //Analitycs
             var path = $location.path(); 
             var name = $state.current.data.pageTitle; 
             gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);