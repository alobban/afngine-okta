/**
 * Created by andrewlobban on 10/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService)
    ;

    function authService(store, $rootScope, $state, $interval) {
        $rootScope.isAuthenticated = false;
        var service = {};
        var vm = this;
        $rootScope.searchBtnVisible = false;

        vm.oktaSignIn = new OktaSignIn({
            baseUrl: 'https://afnww.oktapreview.com',
            logo: 'https://www.loadafn.com/wp-content/uploads/2015/09/AFN_Logo_RedWhite_new-red.png',
            // OIDC options
            clientId: 'vxhos1H0SD0RIZQQSYpf',
            // redirectUri: 'http://localhost:8000/#/',
            authScheme: 'OAUTH2',
            authParams: {
                responseType: 'id_token',
                responseMode: 'okta_post_message',
                scope: [
                    'openid',
                    'email',
                    'profile',
                    'address',
                    'phone',
                    'groups'
                ]
            },
            idpDisplay: 'PRIMARY',
            idps: [{
                'type': 'GOOGLE',
                'id': '0oaaix1twko0jyKik0g4'
            }]
        });

        service.checkAuth = function () {
            // check if the browser's local storage has idToken and Profile
            if(store.get('id_token') && store.get('profile')) {
                getExistingSession();
                $rootScope.isAuthenticated = true;
            } else {
                processSignoutSession();
            }
            return $rootScope.isAuthenticated;
        };

        // Show/Hide Login-Bar Search Button
        service.showSearchBtn = function (visibility) {
            $rootScope.searchBtnVisible = visibility;
        };

        function createNewSession() {
            vm.oktaSignIn.renderEl({
                    el: '#okta-login-container'
                },
                function (res) {
                    // res.idToken - id_token generated
                    // res.claims - decoded id_token information
                    store.set('profile', res.claims);
                    store.set('id_token', res.idToken);
                    $rootScope.idToken = res.idToken;
                    $rootScope.isAuthenticated = true;
                    $state.go('home');
                },
                function (err) {
                    // handleErrors(err) and $rootScope.isAuthenticated should remain false;
                    console.log(err);
                }
            );
        }

        function getExistingSession() {
            vm.oktaSignIn.session.exists(function (exists) {
                if (exists) {
                    $rootScope.isAuthenticated = true;
                } else {
                    createNewSession();
                }
            });
        }

        function processSignoutSession() {
            vm.oktaSignIn.signOut();
            store.remove('profile');
            store.remove('id_token');
            store.remove('lastUrl');
            $rootScope.isAuthenticated = false;
            $rootScope.$broadcast('killInterval', {});
            $state.go('home');
        }

        service.login = function() {
            getExistingSession();
        };

        service.logout = function() {
            processSignoutSession();
        };

        service.getUser = function() {
            return store.get("profile");
        };

        service.killInterval = function(promise) {
            $interval.cancel(promise);
        };

        return service;
    }
})();