angular
    .module('PREPIEGGApp')
    .controller('main_menuCtrl', [
        '$timeout',
        '$scope',
        '$state',
        '$http',
        '$location',
        function ($timeout,$scope,$state,$http,$location) {
            $scope.cmb_eleccion_data = [{'valor':1, 'nombre':'Gubernatura'},{'valor':2, 'nombre':'Diputaciones'},{'valor':3, 'nombre':'Ayuntamientos'}];
            $scope.cmb_eleccion_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'nombre',
                onInitialize: function(selectize){
                    selectize.setValue(1); 
                },
            }; 
            $scope.msg = "";
            $scope.search1 = function(){
                var modal1 = new UIkit.modal("#modal_search", {keyboard:false, bgclose: false});
                $scope.msg = "";
                this.section_txt = "";
                this.eleccion_cmb = 1;
                modal1.show();
            }
            $scope.info = function(){
                var modal2 = new UIkit.modal("#modal_lightbox", {keyboard:false, bgclose: false});
                $scope.msg = "";
                this.section_txt = "";
                this.eleccion_cmb = 1;
                modal2.show();
            }
            $scope.search = function(){
                var modal3 = new UIkit.modal("#modal_search", {keyboard:false, bgclose: false});
                $scope.msg = "";
                this.section_txt = "";
                this.eleccion_cmb = 1;
                modal3.show();
            }
            $scope.buscar = function(section_txt, eleccion_cmb ){
                var band = true;
                if (typeof(section_txt) != "undefined"){
                    var sec = section_txt.split("");
                    sec.forEach(element => {
                        if(isNaN(parseInt(element))){
                            band = false;
                        }
                    });
                    if(band){
                        var seccion = parseInt(section_txt);
                        $http({ method: 'GET', url: 'data/view/basedatos/secciones.json'})
                        .then(function (data) {
                            var rst = data.data.Secciones.includes(seccion);
                            var idubicacion = null;
                            if(rst){
                                if(eleccion_cmb == 1){
                                    data.data.distrito.forEach(element => {
                                        if(element.IDSECCION == seccion)
                                        idubicacion = element.IDUBICACION
                                    });
                                    var modal = UIkit.modal("#modal_search");
                                    modal.hide();
                                    $state.go('desktop.gubernatura_seccion_casilla', {id_ubicacion: idubicacion, id_seccion: seccion });
                                }
                                else if(eleccion_cmb == 2){
                                    data.data.distrito.forEach(element => {
                                        if(element.IDSECCION == seccion)
                                        idubicacion = element.IDUBICACION
                                    });
                                    var modal = UIkit.modal("#modal_search");
                                    modal.hide();
                                    $state.go('desktop.diputaciones_seccion_casilla', {id_ubicacion: idubicacion, id_seccion: seccion });
                                }
                                else{
                                    data.data.municipio.forEach(element => {
                                        if(element.IDSECCION == seccion)
                                        idubicacion = element.IDUBICACION
                                    });
                                    var modal = UIkit.modal("#modal_search");
                                    modal.hide();
                                    $state.go('desktop.ayuntamientos_seccion_casilla', {id_ubicacion: idubicacion, id_seccion: seccion });
                                }
                            }
                            else
                                $scope.msg="* No se ha encontrado información para esa sección";
                        });
                    }
                    else    
                    $scope.msg="* Dato invalido";
                }
                else {
                    $scope.msg="* Dato invalido";
                }
                
                // if(isNaN(parseInt(section_txt))){
                //     console.log("pelas");
                // }
                // else{
                //     var seccion = parseInt(section_txt);
                //     console.log(seccion);
                //     // $http({ method: 'GET', url: 'data/view/gubernatura/distritos_secciones.json' })
                //     // .then(function (data) {
                //     //     var secion_distrito = data.data.filter(i => i.IDUBICACION == value )[0].Secciones[0].IDSECCION
                //     //     console.log(data.data);
                //     //     return data.data;
                //     // });
                   
                //     // if($scope.eleccion_cmb == 1){
                //     //     console.log();
                //     // }
                //     // else if($scope.eleccion_cmb == 2){
                //     //     console.log();
                //     // }
                //     // else{
                //     //     console.log();
                //     // }
                // }
               
            }
        }
    ]);

