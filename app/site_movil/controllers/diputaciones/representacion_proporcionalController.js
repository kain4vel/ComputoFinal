angular
    .module('PREPIEGGApp')
    .controller('movil_diputaciones_representacion_proporcionalCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$window',
        '$location',
        '$state',
        'encabezados',
        'entidad',
        function ($rootScope, $scope, $timeout, $window, $location, $state, encabezados, entidad) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;
            $scope.entidad['resumen'] = entidad.resumen;

            $scope.cmb_actas_data = entidad.detalle_votos_casilla_rp;
            $scope.cmb_actas_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                onInitialize: function (selectize) {
                    selectize.setValue(81);
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