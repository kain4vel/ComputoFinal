angular
    .module('PREPIEGGApp')
    .controller('municipiosCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$window',
        '$location',
        '$state',
        'cmb_municipios',
        function ($rootScope, $scope, $timeout, $window, $location, $state,cmb_municipios) {
            $scope.cmb_municipios = cmb_municipios;
            $scope.cmb_municipios_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDUBICACION',
                labelField: 'DESCRIPCION',
                onInitialize: function(selectize){
                    selectize.setValue("1"); 
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