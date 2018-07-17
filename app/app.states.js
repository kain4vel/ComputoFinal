PREPIEGGApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/inicio','/')
                .otherwise('/');

            $stateProvider
                // -- DESKTOP --
                .state("desktop", {
                    abstract: true,
                    url: "",
                    templateUrl: 'app/site_desktop/views/master.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_selectizeJS',
                                'lazy_iCheck',
                                'lazy_double_scroll',
                                'lazy_social_share'
                            ]);
                        }]
                    },
                    ncyBreadcrumb: {
                        label: 'Inicio'
                    }
                })
                // -- GOBERNADOR --
                .state("desktop.gubernatura_entidad", {
                    url: "/",
                    templateUrl: 'app/site_desktop/views/gubernatura/entidadView.html',
                    controller: 'gubernatura_entidadCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_highcharts',
                                'app/site_desktop/controllers/gubernatura/entidadController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen_entidad'] = data.data.resumen_entidad;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Inicio'
                    }
                })
                .state("desktop.gubernatura_entidad_pp_ci", {
                    url: "/gubernatura/entidad_pp_ci",
                    templateUrl: 'app/site_desktop/views/gubernatura/entidad_pp_ciView.html',
                    controller: 'gubernatura_entidad_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_highcharts',
                                'app/site_desktop/controllers/gubernatura/entidad_pp_ciController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Entidad - Votos por Partido Político y Candidatura Independiente',
                    }
                })
                .state("desktop.gubernatura_entidad_detalle", {
                    url: "/gubernatura/entidad_detalle",
                    templateUrl: 'app/site_desktop/views/gubernatura/entidad_detalleView.html',
                    controller: 'gubernatura_entidad_detalleCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/entidad_detalleController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen_entidad'] = data.data.resumen_entidad;
                                    entidad['actas_resumen'] = data.data.actas_resumen;
                                    entidad['distribucion_entidad'] = data.data.distribucion_entidad;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Detalle de Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Detalle de Entidad - Votos por Candidatura'
                    }
                })
                .state("desktop.gubernatura_entidad_detalle_pp_ci", {
                    url: "/gubernatura/entidad_detalle_pp_ci",
                    templateUrl: 'app/site_desktop/views/gubernatura/entidad_detalle_pp_ciView.html',
                    controller: 'gubernatura_entidad_detalle_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/entidad_detalle_pp_ciController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['distribucion_entidad_pp_ci'] = data.data.distribucion_entidad_pp_ci;
                                    entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                    entidad['resumen_entidad'] = data.data.resumen_entidad;
                                    entidad['actas_resumen'] = data.data.actas_resumen;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Detalle de Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Detalle de Entidad - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.gubernatura_distritos", {
                    url: "/gubernatura/distritos",
                    templateUrl: 'app/site_desktop/views/gubernatura/distritosView.html',
                    controller: 'gubernatura_distritosCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/distritosController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen_entidad'] = data.data.resumen_entidad;
                                    entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                    entidad['actas_resumen'] = data.data.actas_resumen;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Distritos por Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Distritos por Entidad - Votos por Candidatura'
                    }
                })
                .state("desktop.gubernatura_distritos_pp_ci", {
                    url: "/gubernatura/distritos_pp_ci",
                    templateUrl: 'app/site_desktop/views/gubernatura/distritos_pp_ciView.html',
                    controller: 'gubernatura_distritos_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/distritos_pp_ciController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['detalle_votos_distritos_pp_ci'] = data.data.detalle_votos_distritos_pp_ci;
                                    entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                    entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                    entidad['resumen_entidad'] = data.data.resumen_entidad;
                                    entidad['actas_resumen'] = data.data.actas_resumen;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Distritos por Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Distritos por Entidad - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.gubernatura_seccion_distrito", {
                    url: "/gubernatura/seccion_distrito/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/gubernatura/seccion_distritoView.html',
                    controller: 'gubernatura_seccion_distritoCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/seccion_distritoController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['seccion_distrito'] = data.data.seccion_distrito;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        cmb_distritos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/cmb_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Secciones por Distrito'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Secciones por Distrito'
                    }
                })
                .state("desktop.gubernatura_casillas", {
                    url: "/gubernatura/seccion_casilla",
                    templateUrl: 'app/site_desktop/views/gubernatura/casillasView.html',
                    controller: 'gubernatura_casillasCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/casillasController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        distritos_secciones: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/distritos_secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        cmb_distritos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/cmb_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Sección - Casilla'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Sección - Casilla'
                    }
                })
                .state("desktop.gubernatura_seccion_casilla", {
                    url: "/gubernatura/seccion_casilla/:id_ubicacion/:id_seccion",
                    templateUrl: 'app/site_desktop/views/gubernatura/seccion_casillaView.html',
                    controller: 'gubernatura_seccion_casillaCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/seccion_casillaController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['casillas'] = data.data.casillas;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        distritos_secciones: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/distritos_secciones.json' })
                                .then(function (data) {
                                    console.log(data.data);
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Gubernatura - Sección - Casilla'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Sección - Casilla'
                    }
                })
                .state("desktop.gubernatura_voto_extranjero", {
                    url: "/gubernatura/voto_extranjero",
                    templateUrl: 'app/site_desktop/views/gubernatura/voto_extranjeroView.html',
                    controller: 'gubernatura_voto_extranjeroCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/gubernatura/voto_extranjeroController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/gubernatura/gubernatura_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['casillas'] = data.data.casillas.filter(i => i.IDSECCION == 0)[0];
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/gubernatura/encabezados_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                    },
                    data: {
                        pageTitle: 'Gubernatura - Voto desde el extranjero'
                    },
                    ncyBreadcrumb: {
                        label: 'Gubernatura - Voto desde el extranjero'
                    }
                })

                // -- DIPUTACIONES --
                .state("desktop.diputaciones_entidad", {
                    url: "/diputaciones/entidad",
                    templateUrl: 'app/site_desktop/views/diputaciones/entidadView.html',
                    controller: 'diputaciones_entidadCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_maps_districts',
                                'lazy_highcharts',
                                'app/site_desktop/controllers/diputaciones/entidadController.js',
                            ]);
                        }],
                        cmb_partidos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/cmb_partidos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        tbl_partidos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/tbl_partidos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json'})
                            .then(function (data) {
                                var entidad = {};
                                entidad['resumen_entidad'] = data.data.resumen_entidad;
                                entidad['municipios_partido'] = data.data.municipios_partido;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                        
                    },
                    data: {
                        pageTitle: 'Diputaciones - Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Entidad - Distritos'
                    }
                })
                .state("desktop.diputaciones_entidad_pp_ci", {
                    url: "/diputaciones/entidad_pp_ci",
                    templateUrl: 'app/site_desktop/views/diputaciones/entidad_pp_ciView.html',
                    controller: 'diputaciones_entidad_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_highcharts',
                                'app/site_desktop/controllers/diputaciones/entidad_pp_ciController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json'})
                            .then(function (data) {
                                var entidad = {};
                                entidad['resumen'] = data.data.resumen;
                                entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                return entidad;
                            });
                        }
                        
                    },
                    data: {
                        pageTitle: 'Diputaciones - Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Entidad - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.diputaciones_entidad_detalle", {
                    url: "/diputaciones/entidad_detalle",
                    templateUrl: 'app/site_desktop/views/diputaciones/entidad_detalleView.html',
                    controller: 'diputaciones_entidad_detalleCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/entidad_detalleController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json'})
                            .then(function (data) {
                                var entidad = {};
                                entidad['municipios_partido'] = data.data.municipios_partido;
                                entidad['resumen_entidad'] = data.data.resumen_entidad;
                                entidad['detalle_entidad'] = data.data.detalle_entidad;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['actas_resumen'] = data.data.actas_resumen;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Detalle de la Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Detalle de la Entidad - Distritos'
                    }
                })
                .state("desktop.diputaciones_entidad_detalle_pp_ci", {
                    url: "/diputaciones/entidad_detalle_pp_ci",
                    templateUrl: 'app/site_desktop/views/diputaciones/entidad_detalle_pp_ciView.html',
                    controller: 'diputaciones_entidad_detalle_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/entidad_detalle_pp_ciController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json' })
                            .then(function (data) {
                                var entidad = {};
                                entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                entidad['detalle_entidad_pp_ci'] = data.data.detalle_entidad_pp_ci;
                                entidad['actas_resumen'] = data.data.actas_resumen;
                                // entidad['actas_detalle'] = data.data.actas_detalle;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }

                    },
                    data: {
                        pageTitle: 'Diputaciones - Detalle de la Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Detalle de la Entidad - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.diputaciones_distritos", {
                    url: "/diputaciones/distritos/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/diputaciones/distritosView.html',
                    controller: 'diputaciones_distritosCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/distritosController.js'
                            ]);
                        }],
                        cmb_distritos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/cmb_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json' })
                            .then(function (data) {
                                var entidad = {};
                                entidad['municipios_partido'] = data.data.municipios_partido;
                                entidad['distribucion_entidad'] = data.data.distribucion_entidad;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Detalle del Distrito'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Detalle del Distrito - Votos por Candidatura'
                    }
                })
                .state("desktop.diputaciones_distritos_pp_ci", {
                    url: "/diputaciones/distritos_pp_ci/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/diputaciones/distritos_pp_ciView.html',
                    controller: 'diputaciones_distritos_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/distritos_pp_ciController.js'
                            ]);
                        }],
                        cmb_distritos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/cmb_distritos.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_distritos_pp_ci.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json'})
                            .then(function (data) {
                                var entidad = {};
                                entidad['distribucion_entidad_pp_ci'] = data.data.distribucion_entidad_pp_ci;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Detalle del Distrito'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Detalle del Distrito - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.diputaciones_representacion_proporcional", {
                    url: "/diputaciones/representacion_proporcional",
                    templateUrl: 'app/site_desktop/views/diputaciones/representacion_proporcionalView.html',
                    controller: 'diputaciones_representacion_proporcionalCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/representacion_proporcionalController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/encabezados_rp.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen_votacion_rp'] = data.data.resumen_votacion_rp;
                                    entidad['detalle_votos_casilla_rp'] = data.data.detalle_votos_casilla_rp;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Representación Proporcional'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Representación Proporcional'
                    }
                })
                .state("desktop.diputaciones_seccion_distrito", {
                    url: "/diputaciones/seccion_distrito/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/diputaciones/seccion_distritoView.html',
                    controller: 'diputaciones_seccion_distritoCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                               
                                'app/site_desktop/controllers/diputaciones/seccion_distritoController.js',
                            ]);
                        }],
                        cmb_distritos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/cmb_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/Ubicaciones-Partidos-Secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['seccion_distrito'] = data.data.seccion_distrito;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Secciones por Distrito'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Secciones por Distrito'
                    }
                })
                .state("desktop.diputaciones_casillas", {
                    url: "/diputaciones/seccion_casilla",
                    templateUrl: 'app/site_desktop/views/diputaciones/casillasView.html',
                    controller: 'diputaciones_casillasCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/casillasController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        distritos_secciones: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/Ubicaciones-Partidos-Secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        cmb_distritos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/cmb_distritos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Sección - Casilla'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Sección - Casilla'
                    }
                })
                .state("desktop.diputaciones_seccion_casilla", {
                    url: "/diputaciones/seccion_casilla/:id_ubicacion/:id_seccion",
                    templateUrl: 'app/site_desktop/views/diputaciones/seccion_casillaView.html',
                    controller: 'diputaciones_seccion_casillaCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/diputaciones/seccion_casillaController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/diputaciones/Ubicaciones-Partidos-Secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/diputaciones/diputaciones_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['casillas'] = data.data.casillas;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Diputaciones - Sección - Casilla'
                    },
                    ncyBreadcrumb: {
                        label: 'Diputaciones - Sección - Casilla'
                    }
                })
                
                // -- AYUTAMIENTOS
                .state("desktop.ayuntamientos_entidad", {
                    url: "/ayuntamiento/entidad",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/entidadView.html',
                    controller: 'ayuntamiento_entidadCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_maps_locations',
                                'lazy_highcharts',
                                'app/site_desktop/controllers/ayuntamiento/entidadController.js'
                            ]);
                        }],
                        cmb_partidos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/cmb_partidos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        tbl_partidos: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/tbl_partidos.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json'})
                            .then(function (data) {
                                var entidad = {};
                                entidad['resumen_entidad'] = data.data.resumen_entidad;
                                entidad['resumen'] = data.data.resumen;
                                entidad['municipios_partido'] = data.data.municipios_partido;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamientos - Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamientos - Entidad - Votos por Candidatura'
                    }
                })
                .state("desktop.ayuntamientos_entidad_pp_ci", {
                    url: "/ayuntamiento/entidad_pp_ci",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/entidad_pp_ciView.html',
                    controller: 'ayuntamientos_entidad_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_highcharts',
                                'app/site_desktop/controllers/ayuntamiento/entidad_pp_ciController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json'})
                            .then(function (data) {
                                var entidad = {};
                                entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamientos - Entidad'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamientos - Entidad - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.ayuntamientos_entidad_detalle", {
                    url: "/ayuntamiento/entidad_detalle",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/entidad_detalleView.html',
                    controller: 'ayuntamientos_entidad_detalleCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/entidad_detalleController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/encabezados_entidad.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                            .then(function (data) {
                                var entidad = {};
                                entidad['municipios_partido'] = data.data.municipios_partido;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['resumen_entidad'] = data.data.resumen_entidad;
                                entidad['detalle_entidad'] = data.data.detalle_entidad;
                                entidad['actas_resumen'] = data.data.actas_resumen;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamiento - Detalle de la Entidad - Municipios'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamiento  - Detalle de la Entidad - Municipios'
                    }
                })
                .state("desktop.ayuntamientos_entidad_detalle_pp_ci", {
                    url: "/ayuntamiento/entidad_detalle_pp_ci",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/entidad_detalle_pp_ciView.html',
                    controller: 'ayuntamientos_entidad_detalle_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/entidad_detalle_pp_ciController.js'
                            ]);
                        }],
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/encabezados_entidad_pp_ci.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                            .then(function (data) {
                                var entidad = {};
                                entidad['resumen_entidad_pp_ci'] = data.data.resumen_entidad_pp_ci;
                                entidad['detalle_entidad_pp_ci'] = data.data.detalle_entidad_pp_ci;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['actas_resumen'] = data.data.actas_resumen;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamiento - Detalle de la Entidad - Municipios'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamiento - Detalle de la Entidad - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.ayuntamientos_municipios", {
                    url: "/ayuntamiento/municipios/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/municipiosView.html',
                    controller: 'ayuntamientos_municipiosCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/municipiosController.js'
                            ]);
                        }],
                        cmb_municipios: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/cmb_municipios.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                            .then(function (data) {
                                var entidad = {};
                                entidad['municipios_partido'] = data.data.municipios_partido;
                                entidad['distribucion_entidad'] = data.data.distribucion_entidad;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/encabezados_detalle.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamiento - Detalle por Municipio'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamiento - Detalle por Municipio - Votos por Candidatura'
                    }
                })
                .state("desktop.ayuntamientos_municipios_pp_ci", {
                    url: "/ayuntamiento/municipios_pp_ci/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/municipios_pp_ciView.html',
                    controller: 'ayuntamientos_municipios_pp_ciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/municipios_pp_ciController.js'
                            ]);
                        }],
                        cmb_municipios: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/cmb_municipios.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                            .then(function (data) {
                                var entidad = {};
                                entidad['distribucion_entidad_pp_ci'] = data.data.distribucion_entidad_pp_ci;
                                entidad['detalle_votos_distritos'] = data.data.detalle_votos_distritos;
                                entidad['resumen'] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/encabezados_detalle_pp_ci.json' })
                            .then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamiento - Detalle por Municipio'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamiento - Detalle por Municipio - Votos por Partido Político y Candidatura Independiente'
                    }
                })
                .state("desktop.ayuntamientos_seccion_municipio", {
                    url: "/ayuntamiento/seccion_municipio/:id_ubicacion",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/seccion_municipioView.html',
                    controller: 'ayuntamientos_seccion_municipioCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/seccion_municipioController.js'
                            ]);
                        }],
                        cmb_municipios: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/cmb_municipios.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['seccion_distrito'] = data.data.seccion_distrito;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                    },
                    data: {
                        pageTitle: 'Ayuntamiento - Secciones por Municipio'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamiento - Secciones por Municipio'
                    }
                })
                .state("desktop.ayuntamientos_casillas", {
                    url: "/ayuntamientos/seccion_casilla",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/casillasView.html',
                    controller: 'ayuntamientos_casillasCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/casillasController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        municipios_secciones: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        cmb_municipios: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/cmb_municipios.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamientos - Sección - Casilla'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamientos - Sección - Casilla'
                    }
                })
                .state("desktop.ayuntamientos_seccion_casilla", {
                    url: "/ayuntamiento/seccion_casilla/:id_ubicacion/:id_seccion",
                    templateUrl: 'app/site_desktop/views/ayuntamiento/seccion_casillaView.html',
                    controller: 'ayuntamientos_seccion_casillaCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/site_desktop/controllers/ayuntamiento/seccion_casillaController.js'
                            ]);
                        }],
                        entidad: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/ayuntamientos/ayuntamientos_info.json' })
                                .then(function (data) {
                                    var entidad = {};
                                    entidad['casillas'] = data.data.casillas;
                                    entidad['resumen'] = data.data.resumen;
                                    return entidad;
                                });
                        },
                        encabezados: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Ayuntamiento - Sección-Casilla'
                    },
                    ncyBreadcrumb: {
                        label: 'Ayuntamiento - Sección-Casilla'
                    }
                })
                
                // -- BASE DATOS --
                .state("desktop.basedatos", {
                    url: "/Base_Datos",
                    templateUrl: 'app/site_desktop/views/basedatos/base_datosView.html',
                    controller: 'base_datosCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('app/site_desktop/controllers/basedatos/base_datosController.js');
                        }],
                        menu_lateral: function ($http) {
                            return $http({ method: 'GET', url: 'data/view/basedatos/menu_lateral.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        basedatos: function ($http) {
                            return $http({ method: 'GET', url: 'data/info/basedatos/bd.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Base de Datos'
                    },
                    ncyBreadcrumb: {
                        label: 'Base de datos'
                    }
                })
                // ----------------------------------------- MOVIL -----------------------------------------
                .state("movil", {
                    abstract: true,
                    url: "",
                    templateUrl: "app/site_movil/views/master.html",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "lazy_uikit",
                                    "lazy_selectizeJS",
                                    "lazy_iCheck"
                                ]);
                            }
                        ]
                    }
                })

                // ---------------------------------------- MOVIL GOBERNADOR ----------------------------------------
                .state("movil.gubernatura_entidad", {
                    url: "/movil/gubernatura-entidad",
                    templateUrl: "app/site_movil/views/gubernatura/entidadView.html",
                    controller: "movil_gobernador_entidadCtrl",
                    resolve: {
                        deps: [ "$ocLazyLoad", function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/gubernatura/entidadController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["resumen_gubernatura"] = data.data.resumen_gubernatura;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Entidad"
                    }
                })

                .state("movil.gubernatura_entidad_mostrar_detalle", {
                    url: "/movil/gubernatura-entidad-detalle",
                    templateUrl: "app/site_movil/views/gubernatura/entidadDetalleView.html",
                    controller: "movil_gobernador_entidadCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/gubernatura/entidadController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) {
                            return $http({
                                method: "GET",
                                url: "data/view/gubernatura/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Entidad"
                    }
                })
                .state("movil.gubernatura_entidad_pp_ci", {
                    url: "/movil/gubernatura/entidad_pp_ci",
                    templateUrl: "app/site_movil/views/gubernatura/entidad_pp_ciView.html",
                    controller: "movil_entidad_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/gubernatura/entidad_pp_ciController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) {
                            return $http({
                                method: "GET",
                                url: "data/view/gubernatura/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Entidad"
                    }
                })

                .state("movil.gubernatura_entidad_detalle", {
                    url: "/movil/gubernatura/entidad_detalle",
                    templateUrl: "app/site_movil/views/gubernatura/entidad_detalleView.html",
                    controller: "movil_entidad_detalleCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/entidad_detalleController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["distribucion_entidad"] = data.data.distribucion_entidad;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Detalle de Entidad"
                    }
                })
                .state("movil.gubernatura_entidad_detalle_pp_ci", {
                    url: "/movil/gubernatura/entidad_detalle_pp_ci",
                    templateUrl: "app/site_movil/views/gubernatura/entidad_detalle_pp_ciView.html",
                    controller: "movil_entidad_detalle_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/entidad_detalle_pp_ciController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["distribucion_entidad_pp_ci"] = data.data.distribucion_entidad_pp_ci;
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Detalle de Entidad"
                    }
                })
                .state("movil.gubernatura_distritos", {
                    url: "/movil/gubernatura/distritos/:id_ubicacion",
                    templateUrl: "app/site_movil/views/gubernatura/distritosView.html",
                    controller: "movil_distritosCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/distritosController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["detalle_votos_distritos"] = data.data.detalle_votos_distritos;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        cmb_distritos: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/cmb_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Distritos por Entidad"
                    }
                })
                .state("movil.gubernatura_distritos_pp_ci", {
                    url: "/movil/gubernatura/distritos_pp_ci/:id_ubicacion",
                    templateUrl: "app/site_movil/views/gubernatura/distritos_pp_ciView.html",
                    controller: "distritos_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/distritos_pp_ciController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["detalle_votos_distritos_pp_ci"] = data.data.detalle_votos_distritos_pp_ci;
                                entidad["detalle_votos_distritos"] = data.data.detalle_votos_distritos;
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        cmb_distritos: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/cmb_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Distritos por Entidad"
                    }
                })

                .state("movil.gubernatura_seccion_distrito", {
                    url: "/movil/gubernatura/seccion_distrito/:id_ubicacion",
                    templateUrl: "app/site_movil/views/gubernatura/seccion_distritoView.html",
                    controller: "movil_seccion_distritoCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/seccion_distritoController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["seccion_distrito"] = data.data.seccion_distrito;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        cmb_distritos: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/cmb_distritos.json" }).then(function (data) {
                                return data.data;
                            });
                        },
                        cmb_secciones: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/distritos_secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Secciones por Distrito"
                    }
                })

                .state("movil.gubernatura_seccion_casilla", {
                    url: "/movil/gubernatura/seccion_casilla/:id_ubicacion/:id_seccion",
                    templateUrl: "app/site_movil/views/gubernatura/seccion_casillaView.html",
                    controller: "movil_seccion_casillaCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/seccion_casillaController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["casillas"] = data.data.casillas;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        distritos_secciones: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/distritos_secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Sección - Casilla"
                    }
                })

                .state("movil.gubernatura_voto_extranjero", {
                    url: "/movil/gubernatura/voto_extranjero",
                    templateUrl: "app/site_movil/views/gubernatura/voto_extranjeroView.html",
                    controller: "movil_voto_extranjeroCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/gubernatura/voto_extranjeroController.js"
                                ]);
                            }
                        ],
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/gubernatura/gubernatura_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["casillas"] = data.data.casillas.filter(
                                    i => i.IDSECCION == 0
                                )[0];
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/gubernatura/encabezados_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Gubernatura - Voto desde el extranjero"
                    }
                })

                // ---------------------------------------- MOVIL DIPUTACIONES ----------------------------------------
                .state("movil.diputaciones_entidad", {
                    url: "/movil/diputaciones/entidad",
                    templateUrl: "app/site_movil/views/diputaciones/entidadView.html",
                    controller: "movil_diputaciones_entidadCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/diputaciones/entidadController.js"
                                ]);
                            }
                        ],
                        cmb_partidos: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/cmb_partidos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        tbl_partidos: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/tbl_partidos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["distritos_partido"] = data.data.distritos_partido;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Entidad"
                    }
                })
                .state("movil.diputaciones_entidad_pp_ci", {
                    url: "/movil/diputaciones/entidad_pp_ci",
                    templateUrl: "app/site_movil/views/diputaciones/entidad_pp_ciView.html",
                    controller: "movil_entidad_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/diputaciones/entidad_pp_ciController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen"] = data.data.resumen;
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Entidad"
                    }
                })
                .state("movil.diputaciones_entidad_detalle", {
                    url: "/movil/diputaciones/entidad_detalle",
                    templateUrl: "app/site_movil/views/diputaciones/entidad_detalleView.html",
                    controller: "movil_entidad_detalleCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/entidad_detalleController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["detalle_entidad"] = data.data.detalle_entidad;
                                entidad["actas_detalle"] = data.data.actas_detalle;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Detalle de la Entidad"
                    }
                })
                .state("movil.diputaciones_entidad_detalle_pp_ci", {
                    url: "/movil/diputaciones/entidad_detalle_pp_ci",
                    templateUrl: "app/site_movil/views/diputaciones/entidad_detalle_pp_ciView.html",
                    controller: "movil_entidad_detalle_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/entidad_detalle_pp_ciController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["actas_detalle"] = data.data.actas_detalle;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Detalle de la Entidad"
                    }
                })

                .state("movil.diputaciones_representacion_proporcional", {
                    url: "/movil/diputaciones/representacion_proporcional",
                    templateUrl: "app/site_movil/views/diputaciones/representacion_proporcionalView.html",
                    controller: "movil_diputaciones_representacion_proporcionalCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/representacion_proporcionalController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen"] = data.data.resumen;
                                entidad["resumen_votacion_rp"] = data.data.resumen_votacion_rp;
                                entidad["detalle_votos_casilla_rp"] = data.data.detalle_votos_casilla_rp;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Representación Proporcional"
                    }
                })
                .state("movil.diputaciones_distritos", {
                    url: "/movil/diputaciones/distritos",
                    templateUrl: "app/site_movil/views/diputaciones/distritosView.html",
                    controller: "movil_distritosCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/distritosController.js"
                                ]);
                            }
                        ],
                        cmb_distritos: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/cmb_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        encabezados: function ($http) {
                            return $http({ method: "GET", url: "data/view/diputaciones/encabezados_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["distribucion_entidad"] = data.data.distribucion_entidad;
                                entidad["detalle_votos_distritos"] = data.data.detalle_votos_distritos;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Detalle del Distrito"
                    }
                })
                .state("movil.diputaciones_distritos_pp_ci", {
                    url: "/movil/diputaciones/distritos_pp_ci",
                    templateUrl: "app/site_movil/views/diputaciones/distritos_pp_ciView.html",
                    controller: "entidad_detalle_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/distritos_pp_ciController.js"
                                ]);
                            }
                        ],
                        cmb_distritos: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/cmb_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/encabezados_distritos_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["distribucion_entidad_pp_ci"] = data.data.distribucion_entidad_pp_ci;
                                entidad["actas_municipio_resumen"] = data.data.actas_municipio_resumen;
                                entidad["detalle_votos_distritos"] = data.data.detalle_votos_distritos;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Detalle del Distrito"
                    }
                })
                .state("movil.diputaciones_seccion_distrito", {
                    url: "/movil/diputaciones/seccion_distrito/:id_ubicacion",
                    templateUrl: "app/site_movil/views/diputaciones/seccion_distritoView.html",
                    controller: "movil_seccion_distritodipuCtrl",
                    resolve: {
                        deps: [ "$ocLazyLoad", function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/seccion_distritoController.js"
                                ]);
                            }
                        ],
                        cmb_distritos: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/cmb_distritos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["seccion_distrito"] = data.data.seccion_distrito;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        cmb_secciones: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Secciones por Distrito"
                    }
                })
                .state("movil.diputaciones_seccion_casilla", {
                    url: "/movil/diputaciones/seccion_casilla/:id_ubicacion/:id_seccion",
                    templateUrl: "app/site_movil/views/diputaciones/seccion_casillaView.html",
                    controller: "movil_seccion_casillaCtrl",
                    resolve: {
                        deps: [ "$ocLazyLoad", function ($ocLazyLoad) { return $ocLazyLoad.load([
                                    "app/site_movil/controllers/diputaciones/seccion_casillaController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/diputaciones/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/diputaciones/diputaciones_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["casillas"] = data.data.casillas;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Diputaciones - Sección - Casilla"
                    }
                })

                // ---------------------------------------- MOVIL AYUTAMIENTOS ----------------------------------------
                .state("movil.ayuntamientos_entidad", {
                    url: "/movil/ayuntamiento/entidad",
                    templateUrl: "app/site_movil/views/ayuntamiento/entidadView.html",
                    controller: "movil_ayuntamientos_entidadCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/ayuntamiento/entidadController.js"
                                ]);
                            }
                        ],
                        cmb_partidos: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/cmb_partidos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        tbl_partidos: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/tbl_partidos.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["resumen"] = data.data.resumen;
                                entidad["municipios_partido"] = data.data.municipios_partido;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamientos - Entidad"
                    }
                })
                .state("movil.ayuntamientos_entidad_pp_ci", {
                    url: "/movil/ayuntamiento/entidad_pp_ci",
                    templateUrl: "app/site_movil/views/ayuntamiento/entidad_pp_ciView.html",
                    controller: "movil_entidad_pp_ci_ayu_Ctrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_highcharts',
                                    "app/site_movil/controllers/ayuntamiento/entidad_pp_ciController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamientos - Entidad"
                    }
                })

                .state("movil.ayuntamientos_entidad_detalle", {
                    url: "/movil/ayuntamiento/entidad_detalle",
                    templateUrl: "app/site_movil/views/ayuntamiento/entidad_detalleView.html",
                    controller: "movil_ayuntamientos_entidad_detalleCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/ayuntamiento/entidad_detalleController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/encabezados_entidad.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad"] = data.data.resumen_entidad;
                                entidad["detalle_entidad"] = data.data.detalle_entidad;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["actas_detalle"] = data.data.actas_detalle;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamiento - Detalle de la Entidad - Municipios"
                    }
                })
                .state("movil.ayuntamientos_entidad_detalle_pp_ci", {
                    url: "/movil/ayuntamiento/entidad_detalle_pp_ci",
                    templateUrl: "app/site_movil/views/ayuntamiento/entidad_detalle_pp_ciView.html",
                    controller: "movil_ayuntamientos_entidad_detalle_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/ayuntamiento/entidad_detalle_pp_ciController.js"
                                ]);
                            }
                        ],
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/encabezados_entidad_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["resumen_entidad_pp_ci"] = data.data.resumen_entidad_pp_ci;
                                entidad["detalle_entidad_pp_ci"] = data.data.detalle_entidad_pp_ci;
                                entidad["actas_resumen"] = data.data.actas_resumen;
                                entidad["actas_detalle"] = data.data.actas_detalle;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamiento - Detalle de la Entidad - Municipios"
                    }
                })

                .state("movil.ayuntamientos_municipios_detalle", {
                    url: "/movil/ayuntamiento/municipios_detalle/:id_ubicacion",
                    templateUrl: "app/site_movil/views/ayuntamiento/municipios_detalleView.html",
                    controller: "movil_municipiosCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/ayuntamiento/municipios_detalleController.js"
                                ]);
                            }
                        ],
                        cmb_municipios: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/cmb_municipios.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["distribucion_entidad"] = data.data.distribucion_entidad;
                                entidad["actas_municipio_resumen"] = data.data.actas_municipio_resumen;
                                entidad["detalle_votos_distritos"] = data.data.detalle_votos_distritos;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) {
                            return $http({
                                method: "GET",
                                url: "data/view/ayuntamientos/encabezados_detalle.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamiento - Detalle por Municipio"
                    }
                })
                .state("movil.ayuntamientos_municipios_detalle_pp_ci", {
                    url: "/movil/ayuntamiento/municipios_detalle_pp_ci/:id_ubicacion",
                    templateUrl: "app/site_movil/views/ayuntamiento/municipios_detalle_pp_ciView.html",
                    controller: "ayutamiento_municipios_detalle_pp_ciCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/ayuntamiento/municipios_detalle_pp_ciController.js"
                                ]);
                            }
                        ],
                        cmb_municipios: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/cmb_municipios.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["distribucion_entidad_pp_ci"] = data.data.distribucion_entidad_pp_ci;
                                entidad["actas_municipio_resumen"] = data.data.actas_municipio_resumen;
                                entidad["detalle_votos_distritos"] = data.data.detalle_votos_distritos;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/encabezados_detalle_pp_ci.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamiento - Detalle por Municipio"
                    }
                })
                .state("movil.ayuntamientos_seccion_municipio", {
                    url: "/movil/ayuntamiento/seccion_municipio/:id_ubicacion",
                    templateUrl: "app/site_movil/views/ayuntamiento/seccion_municipioView.html",
                    controller: "movil_ayutamiento_seccion_municipioCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/ayuntamiento/seccion_municipioController.js"
                                ]);
                            }
                        ],
                        cmb_secciones: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        cmb_municipios: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/cmb_municipios.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["seccion_distrito"] = data.data.seccion_distrito;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamiento - Secciones por Distrito"
                    }
                })
                .state("movil.ayuntamientos_seccion_casilla", {
                    url: "/movil/ayuntamiento/seccion_casilla/:id_ubicacion/:id_seccion",
                    templateUrl: "app/site_movil/views/ayuntamiento/seccion_casillaView.html",
                    controller: "movil_seccion_casillaCtrl",
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "app/site_movil/controllers/ayuntamiento/seccion_casillaController.js"
                                ]);
                            }
                        ],
                        cmb_secciones: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        },
                        entidad: function ($http) { return $http({ method: "GET", url: "data/info/ayuntamientos/ayuntamientos_info.json"
                            }).then(function (data) {
                                var entidad = {};
                                entidad["casillas"] = data.data.casillas;
                                entidad["resumen"] = data.data.resumen;
                                return entidad;
                            });
                        },
                        encabezados: function ($http) { return $http({ method: "GET", url: "data/view/ayuntamientos/Ubicaciones-Partidos-Secciones.json"
                            }).then(function (data) {
                                return data.data;
                            });
                        }
                    },
                    data: {
                        pageTitle: "Ayuntamiento - Sección-Casilla"
                    }
                });
        }
    ]);
