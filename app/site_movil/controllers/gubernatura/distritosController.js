angular
    .module('PREPIEGGApp')
    .controller('movil_distritosCtrl', [
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
        'cmb_distritos',
        function ($rootScope, $scope, $timeout, $location, $state, $stateParams, $window, cmb_distritos, encabezados, entidad, cmb_distritos) {
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
            
            $scope.radio_diputaciones = 1;
            $scope.getVal = function () {
                if ($scope.radio_diputaciones == 2)
                    $state.transitionTo('desktop.diputaciones_distritos_pp_ci');
            };

            $scope.reload= function(){
                $window.location.reload();  
            };

            var path = $location.path(); 
            var name = $state.current.data.pageTitle; 
            gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);