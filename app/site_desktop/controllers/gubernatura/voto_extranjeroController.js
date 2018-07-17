angular
    .module('PREPIEGGApp')
    .controller('gubernatura_voto_extranjeroCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        '$location',
        '$state',
        'encabezados',
        'entidad',
        function ($rootScope,$scope, $window, $location, $state, encabezados,entidad) {
            $scope.entidad = entidad;
            $scope.encabezados = encabezados;
            $scope.codigo_sha = "";
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