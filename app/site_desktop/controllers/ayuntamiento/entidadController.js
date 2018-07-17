angular
    .module('PREPIEGGApp')
    .controller('ayuntamiento_entidadCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$state',
        '$window',
        '$location',
        'cmb_partidos',
        'tbl_partidos',
        'encabezados',
        'entidad',
        function ($rootScope,$scope,$timeout,$state,$window,$location,cmb_partidos,tbl_partidos,encabezados,entidad) {
            $scope.entidad = entidad;
            $scope.tbl_partidos = tbl_partidos;
            $scope.encabezados = encabezados;
            $scope.cmb_partidos_data = cmb_partidos;
            $scope.municipios_partido = entidad.municipios_partido;

            $('#vmaps_municipios').mapael({
                map: {
                    name: "municipios_gto",
                    defaultArea: {
                        attrs: {
                            fill: "#ececec",
                            stroke: "#3a3a3a",
                            "stroke-width": 1
                        },
                        attrsHover: {
                            fill: " ",
                        }
                    }
                },
                legend: {
                    area: {
                        slices: [
                            {
                                sliceValue: "PAN",
                                attrs: {fill: "#006775"}
                            },
                            {
                                sliceValue: "PRI",
                                attrs: {fill: "#037A24"}
                            },
                            {
                                sliceValue: "PRD",
                                attrs: {fill: "#FFCF29"}
                            },
                            {
                                sliceValue: "PVEM",
                                attrs: {fill: "#A0CE67"}
                            },
                            {
                                sliceValue: "PT",
                                attrs: {fill: "#FF1521"}
                            },
                            {
                                sliceValue: "MC",
                                attrs: {fill: "#FF8200"}
                            },
                            {
                                sliceValue: "NA",
                                attrs: {fill: "#00B3B5"}
                            },
                            {
                                sliceValue: "MORENA",
                                attrs: {fill: "#A02419"}
                            },
                            {
                                sliceValue: "PES",
                                attrs: {fill: "#865ABA"}
                            },
                            {
                                sliceValue: "MORENA-PT-PES",
                                attrs: {fill: "#CF1C1D"}
                            },
                            {
                                sliceValue: "CAND_IND_1",
                                attrs: {fill: "#a58d71"}
                            },
                            {
                                sliceValue: "CAND_IND_2",
                                attrs: {fill: "#84705b"}
                            },
                            {
                                sliceValue: "CAND_IND_3",
                                attrs: {fill: "#6b5244"}
                            }
                        ]
                    }
                },
                areas: {
                    "municipio_1" : {value:"", tooltip:{content: "ABASOLO"}},
                    "municipio_2" : {value:"", tooltip:{content: "ACÁMBARO"}},
                    "municipio_3" : {value:"", tooltip:{content: "SAN MIGUEL DE ALLENDE"}},
                    "municipio_4" : {value:"", tooltip:{content: "APASEO EL ALTO"}},
                    "municipio_5" : {value:"", tooltip:{content: "APASEO EL GRANDE"}},
                    "municipio_6" : {value:"", tooltip:{content: "ATARJEA"}},
                    "municipio_7" : {value:"", tooltip:{content: "CELAYA"}},
                    "municipio_8" : {value:"", tooltip:{content: "MANUEL DOBLADO"}},
                    "municipio_9" : {value:"", tooltip:{content: "COMONFORT"}},
                    "municipio_10" : {value:"", tooltip:{content: "CORONEO"}},
                    "municipio_11" : {value:"", tooltip:{content: "CORTAZAR"}},
                    "municipio_12" : {value:"", tooltip:{content: "CUERÁMARO"}},
                    "municipio_13" : {value:"", tooltip:{content: "DOCTOR MORA"}},
                    "municipio_14" : {value:"", tooltip:{content: "DOLORES HIDALGO CUNA DE LA INDEPENDENCIA NACIONAL"}},
                    "municipio_15" : {value:"", tooltip:{content: "GUANAJUATO"}},
                    "municipio_16" : {value:"", tooltip:{content: "HUANÍMARO"}},
                    "municipio_17" : {value:"", tooltip:{content: "IRAPUATO"}},
                    "municipio_18" : {value:"", tooltip:{content: "JARAL DEL PROGRESO"}},
                    "municipio_19" : {value:"", tooltip:{content: "JERÉCUARO"}},
                    "municipio_20" : {value:"", tooltip:{content: "LEÓN"}},
                    "municipio_21" : {value:"", tooltip:{content: "MOROLEÓN"}},
                    "municipio_22" : {value:"", tooltip:{content: "OCAMPO"}},
                    "municipio_23" : {value:"", tooltip:{content: "PÉNJAMO"}},
                    "municipio_24" : {value:"", tooltip:{content: "PUEBLO NUEVO"}},
                    "municipio_25" : {value:"", tooltip:{content: "PURÍSIMA DEL RINCÓN"}},
                    "municipio_26" : {value:"", tooltip:{content: "ROMITA"}},
                    "municipio_27" : {value:"", tooltip:{content: "SALAMANCA"}},
                    "municipio_28" : {value:"", tooltip:{content: "SALVATIERRA"}},
                    "municipio_29" : {value:"", tooltip:{content: "SAN DIEGO DE LA UNIÓN"}},
                    "municipio_30" : {value:"", tooltip:{content: "SAN FELIPE"}},
                    "municipio_31" : {value:"", tooltip:{content: "SAN FRANCISCO DEL RINCÓN"}},
                    "municipio_32" : {value:"", tooltip:{content: "SAN JOSÉ ITURBIDE"}},
                    "municipio_33" : {value:"", tooltip:{content: "SAN LUIS DE LA PAZ"}},
                    "municipio_34" : {value:"", tooltip:{content: "SANTA CATARINA"}},
                    "municipio_35" : {value:"", tooltip:{content: "SANTA CRUZ DE JUVENTINO ROSAS"}},
                    "municipio_36" : {value:"", tooltip:{content: "SANTIAGO MARAVATÍO"}},
                    "municipio_37" : {value:"", tooltip:{content: "SILAO DE LA VICTORIA"}},
                    "municipio_38" : {value:"", tooltip:{content: "TARANDACUAO"}},
                    "municipio_39" : {value:"", tooltip:{content: "TARIMORO"}},
                    "municipio_40" : {value:"", tooltip:{content: "TIERRA BLANCA"}},
                    "municipio_41" : {value:"", tooltip:{content: "URIANGATO"}},
                    "municipio_42" : {value:"", tooltip:{content: "VALLE DE SANTIAGO"}},
                    "municipio_43" : {value:"", tooltip:{content: "VICTORIA"}},
                    "municipio_44" : {value:"", tooltip:{content: "VILLAGRÁN"}},
                    "municipio_45" : {value:"", tooltip:{content: "XICHÚ"}},
                    "municipio_46" : {value:"", tooltip:{content: "YURIRIA"}},
                }
            });
            $scope.cmb_partidos_config = {
                create: false,
                maxItems: 1,
                valueField: 'valor',
                labelField: 'titulo',
                onInitialize: function (selectize) {
                    selectize.setValue("TODOS");
                },
                onChange: function(value) {
                    var updatedOptions = {'areas' : {}, 'plots' : {}};
                    var newPlots = {};
                    var deletedPlots = [];
                    var filtro = value;
                    if(filtro == "TODOS"){
                        angular.forEach($scope.municipios_partido, function(value, key) {
                            updatedOptions.areas['municipio_' + (key + 1)]={
                                value: value
                            }
                        });
                    }
                    else{
                        angular.forEach($scope.municipios_partido, function(value, key) {
                            if(filtro === value){
                                updatedOptions.areas['municipio_' + (key + 1)]={
                                    value: value
                                }
                            }
                            else{
                                updatedOptions.areas['municipio_' + (key + 1)]={
                                    value: ""
                                }
                            }
                        });
                    }
                    $("#vmaps_municipios").trigger('update', [{mapOptions: updatedOptions, newPlots: newPlots, deletePlotKeys: deletedPlots, animDuration: 500}]);
               }
            };

            $scope.radio_municipios = 1;
            $scope.getVal=function(){
                if($scope.radio_municipios == 2)
                    $state.transitionTo('desktop.ayuntamientos_entidad_pp_ci');
            };

            $scope.reload= function(){
                $window.location.reload();	
            };

            $scope.capturadas = true;
            $scope.contabilizadas = false;
            $scope.porcentaje = $scope.entidad.resumen.actas_p_capturadas;
            $scope.color = '#ff0087';

            $scope.overCapturadas = function(){
                $scope.capturadas = true;
                $scope.contabilizadas = false;
                $scope.porcentaje = $scope.entidad.resumen.actas_p_capturadas;
                $scope.color = '#ff0087';
                $scope.Chart.series[0].update({
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:30px;color:' +
                            $scope.color + '">' + $scope.porcentaje +'%</span><br/>' 
                    }
                });
                $scope.Chart.series[2].update({
                    data: [{
                        color: '#A0A0A0',
                    }]
                });
                $scope.Chart.series[1].update({
                    data: [{
                        color: $scope.color,
                    }]
                });
            };

            $scope.overContabilizadas = function(){
                $scope.capturadas = false;
                $scope.contabilizadas = true;
                $scope.porcentaje =  $scope.entidad.resumen.actas_p_contabilizadas;
                $scope.color = '#7b0055';
                $scope.Chart.series[0].update({
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:30px;color:' +
                            $scope.color + '">' + $scope.porcentaje +'%</span><br/>' 
                    }
                });
                $scope.Chart.series[2].update({
                    data: [{
                        color: $scope.color,
                    }]
                });
                $scope.Chart.series[1].update({
                    data: [{
                        color: '#A0A0A0',
                    }]
                });
            };
            
            $timeout(function() {
                $scope.Chart =  Highcharts.chart('container',{
                    chart: {
                        type: 'solidgauge',
                    },
                    credits: {enabled:false},
                    title: null,
                    tooltip: {
                        enabled: false
                    },
                    pane: {
                        center: ['50%', '90%'],
                        size: '150%',
                        startAngle: -90,
                        endAngle: 90,
                        background: [{ 
                            outerRadius: '90%',
                            innerRadius: '80%',
                            shape: 'arc',
                            backgroundColor: Highcharts.Color('#000000')
                                .setOpacity(0.3)
                                .get()
                        }, { 
                            outerRadius: '75%',
                            innerRadius: '65%',
                            shape: 'arc',
                            backgroundColor: Highcharts.Color('#ff0087')
                                .setOpacity(0.3)
                                .get()
                        }, { 
                            outerRadius: '60%',
                            innerRadius: '50%',
                            shape: 'arc',
                            backgroundColor: Highcharts.Color('#7b0055')
                                .setOpacity(0.3)
                                .get()
                        }]
                    },
                    yAxis: {
                        min: 0,
                        max: 100,
                        lineWidth: 0,
                        minorTickInterval: null,
                        tickAmount: 2,
                        labels: {
                            y: 16,
                            x: 0,
                            format: '{value}%'
                        }
                    },
                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                y: 10,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },
                    series: [
                    {
                        name: 'Esperadas',
                        data: [{
                            color: '#000000',
                            radius: '90%',
                            innerRadius: '80%',
                            y: 100
                        }],
                        dataLabels: {
                            format: '<div style="text-align:center"><span style="font-size:30px;color:' +
                                $scope.color + '">' + $scope.porcentaje +'%</span><br/>' 
                        }
                    },  {
                        name: 'Capturadas',
                        data: [{
                            color: '#ff0087',
                            radius: '75%',
                            innerRadius: '65%',
                            y: parseFloat($scope.entidad.resumen.actas_p_capturadas)
                        }]
                    },{
                        name: 'Contabilizadas',
                        data: [{
                            color: '#A0A0A0',
                            radius: '60%',
                            innerRadius: '50%',
                            y: parseFloat($scope.entidad.resumen.actas_p_contabilizadas)
                        }]
                    }]
                });
            }, 300);


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