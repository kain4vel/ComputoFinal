angular
    .module('PREPIEGGApp')
    .controller('movil_seccion_distritodipuCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$stateParams',
        '$window',
        '$location',
        '$state',
        'cmb_distritos',
        'encabezados',
        'entidad',
        'cmb_secciones',
        function ($rootScope, $scope, $timeout, $stateParams, $window, $location, $state,cmb_distritos, encabezados, entidad, cmb_secciones) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;

            $scope.cmb_distritos_data = cmb_distritos;
            $scope.cmb_distritos_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'titulo',
                onInitialize: function (selectize) {
                    selectize.setValue($stateParams.id_ubicacion);
                },
                onChange: function (value) {
                    var info = cmb_secciones.filter(i => i.IDUBICACION == value)[0].Secciones[0].IDSECCION;
                    $scope.seccion_cmb = info;
                }
            };

            $scope.cmb_secciones_data = cmb_secciones;
            $scope.cmb_secciones_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                onInitialize: function (selectize) {
                    selectize.setValue(752);
                }
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