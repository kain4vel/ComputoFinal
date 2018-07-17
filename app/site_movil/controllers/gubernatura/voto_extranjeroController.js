angular
    .module('PREPIEGGApp')
    .controller('movil_voto_extranjeroCtrl', [
        '$scope',
        '$timeout',
        '$window',
        '$location',
        '$state',
        'encabezados',
        'entidad',
        function ($scope, $timeout, $window, $location, $state, encabezados, entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;

            $scope.reload= function(){
                $window.location.reload();  
            };

            var path = $location.path(); 
            var name = $state.current.data.pageTitle; 
            gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);