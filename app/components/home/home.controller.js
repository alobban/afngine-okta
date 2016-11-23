/**
 * Created by andrewlobban on 10/27/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl)
    ;

    function HomeCtrl(authService, $state, $timeout) {
        var vm = this;
        vm.showSearch = false;
        vm.profile = authService.getUser();

        vm.authorized = authService.checkAuth();
        authService.showSearchBtn(vm.showSearch);
    }
})();