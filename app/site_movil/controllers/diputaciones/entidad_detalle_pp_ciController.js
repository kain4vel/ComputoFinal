angular
    .module('PREPIEGGApp')
    .controller('movil_entidad_detalle_pp_ciCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$location',
        '$state',
        '$window',
        'encabezados',
        'entidad',
        function ($rootScope, $scope, $timeout, $location, $state, $window, encabezados, entidad) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;
            $scope.radio_diputaciones = 2;
            $scope.getVal = function () {
                if ($scope.radio_diputaciones == 1)
                    $state.transitionTo('desktop.diputaciones_entidad_detalle');
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