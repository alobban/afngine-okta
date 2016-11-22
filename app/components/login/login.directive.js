/**
 * Created by vagrant on 8/8/16.
 */

(function () {
    'use strict';

    angular.module('app')
        .directive('login', function () {

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/login/login.html',
                controller: loginController,
                controllerAs: 'vm'
            };
        })
    ;

    function loginController(authService, $rootScope) {
        /*jshint validthis: true */
        var vm = this;
        var tasks;
        vm.search = false;
        vm.minQueryLength = 3;
        vm.login = loginService;
        vm.logout = logoutService;
        vm.iSearch = initiateSearch;
        vm.endSearch = endSearch;

        function loginService() {
            authService.login();
        }

        function logoutService() {
            authService.logout();
        }

        function initiateSearch() {
            vm.search = true;
        }

        function endSearch() {
            vm.search = false;
            vm.selectedItem = '';
            $rootScope.$broadcast('previousFilterSettings', { prevFilters: $rootScope.filters });
        }
    }
})();