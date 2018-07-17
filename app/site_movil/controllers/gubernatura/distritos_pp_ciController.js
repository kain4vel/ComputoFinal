angular.module("PREPIEGGApp").controller("distritos_pp_ciCtrl", [
    "$scope",
    "$timeout",
    '$location',
    "$state",
    "$window",
    "entidad",
    "encabezados",
    "cmb_distritos",
    function ($scope, $timeout,$location, $state, $window, entidad, encabezados, cmb_distritos) {
        $scope.entidad = entidad;
        $scope.encabezados = encabezados;

        $scope.cmb_distritos_data = cmb_distritos;
        $scope.cmb_distritos_config = {
            create: false,
            maxItems: 1,
            valueField: "valor",
            labelField: "titulo",
            onInitialize: function (selectize) {
                selectize.setValue(47);
            }
        };

        $scope.radio_gubernatura = 2;
        $scope.getVal = function () {
            if ($scope.radio_gubernatura == 1)
                $state.transitionTo("desktop.gubernatura_distritos");
        };

        $scope.reload= function(){
            $window.location.reload();  
        };

        var path = $location.path(); 
        var name = $state.current.data.pageTitle; 
        gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
    }
]);
