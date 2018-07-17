PREPIEGGApp
    .config([
        '$ocLazyLoadProvider',
        function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                    // ----------- UIKIT ------------------
                    {
                        name: 'lazy_uikit',
                        files: [
                            // uikit core
                            "bower_components/uikit/js/uikit.min.js",
                            // uikit components
                            "bower_components/uikit/js/components/accordion.min.js",
                            "bower_components/uikit/js/components/autocomplete.min.js",
                            "assets/js/custom/uikit_datepicker.min.js",
                            "bower_components/uikit/js/components/form-password.min.js",
                            "bower_components/uikit/js/components/form-select.min.js",
                            "bower_components/uikit/js/components/grid.min.js",
                            "bower_components/uikit/js/components/lightbox.min.js",
                            "bower_components/uikit/js/components/nestable.min.js",
                            "bower_components/uikit/js/components/notify.min.js",
                            "bower_components/uikit/js/components/slider.min.js",
                            "bower_components/uikit/js/components/slideshow.min.js",
                            "bower_components/uikit/js/components/sortable.min.js",
                            "bower_components/uikit/js/components/sticky.min.js",
                            "bower_components/uikit/js/components/tooltip.min.js",
                            "assets/js/custom/uikit_timepicker.min.js",
                            "bower_components/uikit/js/components/upload.min.js",
                            "assets/js/custom/uikit_beforeready.min.js",
                            // styles
                            "bower_components/uikit/css/uikit.almost-flat.min.css"
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    // ----------- TEMPLATE -----------
                    {
                        name: 'lazy_maps_districts',
                        files: [
                            'bower_components/raphael/raphael.min.js',
                            'bower_components/jquery-mapael/js/jquery.mapael.min.js',
                            'bower_components/jquery-mapael/js/maps/distritos_gto.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_maps_locations',
                        files: [
                            'bower_components/raphael/raphael.min.js',
                            'bower_components/jquery-mapael/js/jquery.mapael.min.js',
                            'bower_components/jquery-mapael/js/maps/municipios_gto.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_echarts',
                        files: [
                            'bower_components/echarts/dist/echarts.min.js',
                            'app/modules/angular-echarts.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_double_scroll',
                        files: [
                            'bower_components/double-scroll/doubleScroll.min.js',
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_iCheck',
                        files: [
                            "bower_components/iCheck/icheck.min.js",
                            'app/modules/angular-icheck.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_autosize',
                        files: [
                            'bower_components/autosize/dist/autosize.min.js',
                            'app/modules/angular-autosize.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_selectizeJS',
                        files: [
                            'bower_components/selectize/dist/js/standalone/selectize.min.js',
                            'app/modules/angular-selectize.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_highcharts',
                        files: [
                            'bower_components/highcharts/highcharts.js',
                            'bower_components/highcharts/highcharts-more.js',
                            'bower_components/highcharts/solid-gauge.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_social_share',
                        files: [
                            'bower_components/social-share/social-share.js',
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_timer',
                        files: [
                            'bower_components/timer/countdown.js',
                        ],
                        serie: true
                    }
                ]
            })
        }
    ]);