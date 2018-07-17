angular
    .module('PREPIEGGApp')
    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        function ($timeout,$scope,$rootScope) {
    
            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $timeout(function() {
                    if(!$rootScope.miniSidebarActive) {
                        // activate current section
                        $('#sidebar_main').find('.current_section > a').trigger('click');
                    } else {
                        // add tooltips to mini sidebar
                        var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                        tooltip_elem.each(function() {
                            var $this = $(this);
    
                            $this.attr('title',$this.find('.menu_title').text());
                            UIkit.tooltip($this, {
                                pos: 'right'
                            });
                        });
                    }
                })
            });
    
            $scope.langSwitcherConfig = {
                maxItems: 1,
                render: {
                    option: function(langData, escape) {
                        return  '<div class="option">' +
                            '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                            '<span>' + escape(langData.title) + '</span>' +
                            '</div>';
                    },
                    item: function(langData, escape) {
                        return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i></div>';
                    }
                },
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                create: false,
                onInitialize: function(selectize) {
                    $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly',true);
                }
            };
    
            // menu entries
            $scope.sections = [
                {
                    id: 0,
                    title: 'Gubernatura',
                    //icon: '&#xE871;',
                    submenu: [
                        {
                            title: 'Entidad',
                            link: 'movil.gubernatura_entidad'
                        },
                        // {
                        //     title: 'Detalle Entidad',
                        //     link: 'movil.gubernatura_entidad_detalle'
                        // },
                        {
                            title: 'Distrito',
                            link: 'movil.gubernatura_distritos'
                        },
                        // {
                        //     title: 'Secciones por Distrito',
                        //     link: 'movil.gubernatura_seccion_distrito({id_ubicacion : 47})'
                        // },
                        {
                            title: 'Sección - Casilla',
                            link: 'movil.gubernatura_seccion_distrito({id_ubicacion : 47})'
                        },
                        {
                            title: 'Voto en el Extranjero',
                            link: 'movil.gubernatura_voto_extranjero'
                        },
                    ]
                },
                {
                    id: 1,
                    title: 'Diputaciones',
                    //icon: '&#xE871;',
                    submenu: [
                        {
                            title: 'Entidad',
                            link: 'movil.diputaciones_entidad'
                        },
                        // {
                        //     title: 'Detalle Entidad',
                        //     link: 'movil.diputaciones_entidad_detalle'
                        // },
                        {
                            title: 'Distrito',
                            link: 'movil.diputaciones_distritos'
                        },
                        // {
                        //     title: 'Secciones por Distrito',
                        //     link: 'movil.diputaciones_seccion_distrito({ id_ubicacion : 47 })'
                        // },
                        {
                            title: 'Sección - Casilla',
                            link: 'movil.diputaciones_seccion_distrito({ id_ubicacion : 47 })'
                        },
                    ]
                },
                {
                    id: 2,
                    title: 'Ayutamientos',
                    //icon: '&#xE871;',
                    submenu: [
                        {
                            title: 'Entidad',
                            link: 'movil.ayuntamientos_entidad'
                        },
                        // {
                        //     title: 'Detalle por Entidad',
                        //     link: 'movil.ayuntamientos_detalle_entidad'
                        // },
                        {
                            title: 'Detalle por Municipio',
                            link: 'movil.ayuntamientos_municipios_detalle({id_ubicacion : 1})'
                        },
                        // {
                        //     title: 'Secciones por Municipio',
                        //     link: 'movil.ayuntamientos_seccion_municipio({id_ubicacion : 1})'
                        // },
                        {
                            title: 'Sección - Casilla',
                            link: 'movil.ayuntamientos_seccion_municipio({id_ubicacion : 1})'
                        },
                    ]
                }
            ]
        }
    ])
;