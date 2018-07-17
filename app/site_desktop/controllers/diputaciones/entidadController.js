angular
    .module('PREPIEGGApp')
    .controller('diputaciones_entidadCtrl', [
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
            $scope.tbl_partidos = tbl_partidos;
            $scope.encabezados = encabezados;
            $scope.distritos_partido = entidad.municipios_partido;
            $scope.entidad = entidad;

            $('#vmaps_distritos').mapael({
                map: {
                    name: "distritos_gto",
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
                                sliceValue: "PAN-PRD",
                                attrs: {fill: "#02B5A1"}
                            },
                            {
                                sliceValue: "MORENA-PT-PES",
                                attrs: {fill: "#CF1C1D"}
                            },
                            {
                                sliceValue: "CANd_IND_1",
                                attrs: {fill: "#A58D71"}
                            }
                        ]
                    }
                },
                areas: {
                    "distrito_1": {
                        value: "",
                        tooltip: {content: "DISTRITO I"}
                    },
                    "distrito_2": {
                        value: "",
                        tooltip: {content: "DISTRITO II"}
                    },
                    "distrito_3": {
                        value: "",
                        tooltip: {content: "DISTRITO III"}
                    },
                    "distrito_4": {
                        value: "",
                        tooltip: {content: "DISTRITO IV"}
                    },
                    "distrito_5": {
                        value: "",
                        tooltip: {content: "DISTRITO V"}
                    },
                    "distrito_6": {
                        value: "",
                        tooltip: {content: "DISTRITO VI"}
                    },
                    "distrito_7": {
                        value: "",
                        tooltip: {content: "DISTRITO VII"}
                    },
                    "distrito_8": {
                        value: "",
                        tooltip: {content: "DISTRITO VIII"}
                    },
                    "distrito_9": {
                        value: "",
                        tooltip: {content: "DISTRITO IX"}
                    },
                    "distrito_10": {
                        value: "",
                        tooltip: {content: "DISTRITO X"}
                    },
                    "distrito_11": {
                        value: "",
                        tooltip: {content: "DISTRITO XI"}
                    },
                    "distrito_12": {
                        value: "",
                        tooltip: {content: "DISTRITO XII"}
                    },
                    "distrito_13": {
                        value: "",
                        tooltip: {content: "DISTRITO XIII"}
                    },
                    "distrito_14": {
                        value: "",
                        tooltip: {content: "DISTRITO XIV"}
                    },
                    "distrito_15": {
                        value: "",
                        tooltip: {content: "DISTRITO XV"}
                    },
                    "distrito_16": {
                        value: "",
                        tooltip: {content: "DISTRITO XVI"}
                    },
                    "distrito_17": {
                        value: "",
                        tooltip: {content: "DISTRITO XVII"}
                    },
                    "distrito_18": {
                        value: "",
                        tooltip: {content: "DISTRITO XVIII"}
                    },
                    "distrito_19": {
                        value: "",
                        tooltip: {content: "DISTRITO XIX"}
                    },
                    "distrito_20": {
                        value: "",
                        tooltip: {content: "DISTRITO XX"}
                    },
                    "distrito_21": {
                        value: "",
                        tooltip: {content: "DISTRITO XXI"}
                    },
                    "distrito_22": {
                        value: "",
                        tooltip: {content: "DISTRITO XXII"}
                    }
                }
            });

            $scope.cmb_partidos_data = cmb_partidos;
            $scope.cmb_partidos_config = {
                create: true,
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
                        angular.forEach($scope.distritos_partido, function(value, key) {
                            updatedOptions.areas['distrito_' + (key + 1)]={
                                value: value
                            }
                        });
                    }
                    else{
                        angular.forEach($scope.distritos_partido, function(value, key) {
                            if(filtro === value){
                                updatedOptions.areas['distrito_' + (key + 1)]={
                                    value: value
                                }
                            }
                            else{
                                updatedOptions.areas['distrito_' + (key + 1)]={
                                    value: ""
                                }
                            }
                        });
                    }
                    $("#vmaps_distritos").trigger('update', [{mapOptions: updatedOptions, newPlots: newPlots, deletePlotKeys: deletedPlots, animDuration: 500}]);
                }
            };
            
            $scope.radio_diputaciones = 1;
            $scope.getVal=function(){
                if($scope.radio_diputaciones == 2)
                    $state.transitionTo('desktop.diputaciones_entidad_pp_ci');
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