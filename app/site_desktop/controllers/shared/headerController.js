angular
    .module('PREPIEGGApp')
    .controller('main_headerCtrl', [
        '$timeout',
        '$scope',
        '$window',
        '$state',
        '$rootScope',
        function ($timeout,$scope,$window,$state,$rootScope) {
            var flag = false;
            var scroll;
            $rootScope.topMenuActive = true;
            $rootScope.footerActive = true;

            $(window).scroll(function(){
                scroll = $(window).scrollTop();
                if(scroll > 85){
                    if(!flag){
                        $("#top_bar").css({"top": "0px","position":"fixed"});
                        flag = true;
                    }
                }else{
                    if(flag){
                        $("#top_bar").css({"top": "85px","position":"absolute","margin-bottom":"100px"});
                        // $(".blog_article").css({"margin-top": "40px"});
                        $("#page_content").css({"margin-top": "40px"})
                        flag = false;
                    }
                }
            });
            
        }
    ])
;

