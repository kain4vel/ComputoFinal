angular
    .module('PREPIEGGApp')
    .controller('gubernatura_seccion_casillaCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$window',
        '$state',
        '$location',
        'distritos_secciones',
        'encabezados',
        'entidad',
        function ($rootScope,$scope,$stateParams,$window,$state, $location, distritos_secciones,encabezados,entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            var info = distritos_secciones.filter(i => i.IDUBICACION == $stateParams.id_ubicacion )[0];
            $scope.descripcion = info.DESCRIPCION;
            $scope.cmb_secciones_data = info.Secciones;
            $scope.codigo_sha = "";
            $scope.cmb_secciones_config = {
                create: false,
                maxItems: 1,
                valueField: 'IDSECCION',
                labelField: 'IDSECCION',
                searchField: ['IDSECCION'],
                onInitialize: function(selectize){
                    selectize.setValue($stateParams.id_seccion); 
                },
                render: {
                    option: function(item, escape) {
                        var label = item.IDSECCION;
                        return '<div>Sección ' + escape(label) + '</div>';
                    },
                    item: function(item, escape) {
                        var label = item.IDSECCION;
                        return '<div>Sección ' + escape(label) + '</div>';
                    }
                }
            }; 
            $scope.open = function(sha) {
                $scope.codigo_sha = sha;
            };
            $scope.copiar = function() {
                var aux = document.createElement("input");
                aux.setAttribute("value", document.getElementById("sha").innerHTML);
                document.body.appendChild(aux);
                aux.select();
                document.execCommand("copy");
                document.body.removeChild(aux);
            }
            $scope.reload= function(){
                $window.location.reload();	
            };

            $("body").floatingSocialShare({
                buttons: ["facebook", "whatsapp", "twitter","mail"],
                twitter_counter: true,
                text: {
                    'facebook': 'Compartir en Facebook',
                    'whatsapp': 'Compartir en Whatsapp',
                    'twitter': 'Compartir en Twitter',
                    'mail': 'Compartir por E-mail'
                  },
                place: "top-right"
              });

             //Analitycs
             var path = $location.path(); 
             var name = $state.current.data.pageTitle; 
             // console.log("Ruta:" + path); console.log("Titulo: " + name); 
             gtag('config', 'UA-120949840-1', { 'page_title': name, 'page_path': path });
        }
    ]);