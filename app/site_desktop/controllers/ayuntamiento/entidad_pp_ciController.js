angular
    .module('PREPIEGGApp')
    .controller('ayuntamientos_entidad_pp_ciCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$state',
        '$window',
        '$location',
        'encabezados',
        'entidad',
        function ($rootScope,$scope,$timeout,$state,$window,$location,encabezados,entidad) {
            $scope.encabezados = encabezados;
            $scope.entidad = entidad;
          
            $scope.radio_municipios = 2;
            $scope.getVal=function(){
                if($scope.radio_municipios == 1)
                    $state.transitionTo('desktop.ayuntamientos_entidad');
            }
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

            var lengthVotos = $scope.entidad.resumen_entidad_pp_ci.total_votos.length;
            var max= 0;
            for(var i=0; i < (lengthVotos-2) ; i++ )
                if(max < $scope.entidad.resumen_entidad_pp_ci.total_votos[i])
                    max = $scope.entidad.resumen_entidad_pp_ci.total_votos[i];

            $scope.max= round10((max * 1.1), 1);
            $scope.intervalo = $scope.max / 5;

             //Redondeo con exponente
             function round10(value, exp) {
                value = +value;
                exp = +exp;
                value = value.toString().split('e');
                value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
                value = value.toString().split('e');
                return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
            }


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