angular
    .module('PREPIEGGApp')
    .controller('entidad_detalle_pp_ciCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$location',
        '$state',
        '$stateParams',
        '$window',
        'cmb_distritos',
        'encabezados',
        'entidad',
        function ($rootScope, $scope, $timeout, $location, $state, $stateParams, $window, cmb_distritos, encabezados, entidad) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;
            $scope.cmb_distritos_data = cmb_distritos;
            $scope.cmb_distritos_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'titulo',
                onInitialize: function (selectize) {
                    selectize.setValue(47);
                }
            };

            $scope.radio_diputaciones = 2;
            $scope.getVal = function () {
                if ($scope.radio_diputaciones == 1)
                    $state.transitionTo('desktop.diputaciones_distritos');
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