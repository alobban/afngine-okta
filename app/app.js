(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular
        .module('app', [
            'angular-storage',
            'angular-jwt',
            'angularMoment',
            'material.components.expansionPanels',
            'ngSanitize',
            'ui.router',
            'ngMdIcons',
            'ngAnimate',
            'ngAria',
            'ngMessages',
            'ngMaterial'
        ])
        .config(function ($provide, $urlRouterProvider, $stateProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/', templateUrl: '/components/home/home.html', controller: 'HomeCtrl as vm'
                })
            ;

            // Add jwt to all HTTP request to the ripcord
            // $httpProvider.interceptors.push(['$q', '$injector', 'store', function($q, $injector, store) {
            //     var getToken = store.get('id_token');
            //     return {
            //         'request': function(config) {
            //             config.headers = config.headers || {};
            //             if (getToken) {
            //                 config.headers.Authorization = 'Bearer ' + getToken;
            //             }
            //             return config;
            //         },
            //         'responseError': function(response) {
            //             var $state = $injector.get('$state');
            //             var authService = $injector.get('authService');
            //             if (response.status === 400 || response.status === 401 || response.status === 403) {
            //                 // if either of the HTTP responses come back, system signs the user out.
            //                 authService.logout();
            //                 console.error("You are not properly authenticated!! ");
            //             }
            //             return $q.reject(response);
            //         }
            //     };
            // }]);

        })
    ;
    
})();