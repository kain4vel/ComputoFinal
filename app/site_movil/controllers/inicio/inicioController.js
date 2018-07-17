angular
    .module('PREPIEGGApp')
    .controller('inicioCtrl', [
        '$scope',
        '$rootScope',
        "$state",
        'utils',
        function ($scope,$rootScope,state,utils) {
            $scope.registerFormActive = false;
            var $login_card = $('#login_card');
        }
    ]);