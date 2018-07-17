angular
    .module('PREPIEGGApp')
    .controller('movil_seccion_casillaCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$stateParams',
        '$window',
        '$location',
        '$state',
        'encabezados',
        'entidad',
        function ($rootScope, $scope, $timeout, $stateParams, $window,$location,$state, encabezados, entidad) {
            $scope.entidad = entidad;
            var info = encabezados.filter(i => i.IDUBICACION == $stateParams.id_ubicacion)[0];
            $scope.partidos = info.Partidos;
            $scope.idubicacion = info.IDUBICACION;
            $scope.descripcion = info.DESCRIPCION;
            $scope.cmb_secciones_data = info.Secciones;
            $scope.cmb_secciones_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                onInitialize: function (selectize) {
                    selectize.setValue($stateParams.id_seccion);
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