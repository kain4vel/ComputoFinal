angular
    .module("PREPIEGGApp").
    controller("movil_entidad_detalleCtrl", [
        "$scope",
        "$timeout",
        '$location',
        "$state",
        "$window",
        "entidad",
        "encabezados",
        function ($scope, $timeout,$location, $state, $window, entidad, encabezados) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            $scope.radio_gubernatura = 1;

            $scope.getVal = function () {
                if ($scope.radio_gubernatura == 2)
                    $state.transitionTo("desktop.gubernatura_entidad_detalle_pp_ci");
            };

            $scope.reload = function () {
                $window.location.reload();
            };

            var path = $location.path(); 
            var name = $state.current.data.pageTitle; 
            gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }

         //Analitycs
        
    ]);
