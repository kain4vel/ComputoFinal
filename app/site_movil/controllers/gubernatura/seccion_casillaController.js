angular
    .module('PREPIEGGApp')
    .controller('movil_seccion_casillaCtrl', [
        '$scope',
        '$timeout',
        '$stateParams',
        '$window',
        '$location',
        '$state',
        'distritos_secciones',
        'encabezados',
        'entidad',
        function ($scope, $timeout, $stateParams, $window,$location,$state, distritos_secciones, encabezados, entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;

            var info = distritos_secciones.filter(i => i.IDUBICACION == $stateParams.id_ubicacion)[0];
            $scope.descripcion = info.DESCRIPCION;

            $scope.cmb_secciones_data = info.Secciones;
            $scope.cmb_secciones_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                searchField: ['IDSECCION'],
                onInitialize: function (selectize) {
                    selectize.setValue($stateParams.id_seccion);
                },
                render: {
                    option: function (item, escape) {
                        var label = item.IDSECCION;
                        return '<div>Sección ' + escape(label) + '</div>';
                    },
                    item: function (item, escape) {
                        var label = item.IDSECCION;
                        return '<div>Sección ' + escape(label) + '</div>';
                    }
                }
            };

            $scope.reload= function(){
                $window.location.reload();  
            };

            var path = $location.path(); 
            var name = $state.current.data.pageTitle; 
            gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);