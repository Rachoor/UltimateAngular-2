angular
    .module('components.auth', [
    'ui.router',
    'ngParse'
    ])
    .config(['ParseProvider', function ($ParseProvider){
        var MY_PARSE_APP_ID = '4HJgdNQU431beXP8mczTlhK3O0Nsm8GtRdpekAmY';
        var MY_PARSE_JS_KEY = '94G4q1EZXZiflZnsh16VCn2ijEkjRxKrgJyVReAJ';
        $ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
        $ParseProvider.serverURL = 'https://parseapi.back4app.com/';
    }])
    .run(function ($transitions, $state, AuthService) {
        $transitions.onStart({
            to: function (state) {
                return !!(state.data && state.data.requiredAuth);
            }
        }, function () {
            return AuthService
                .requireAuthentication()
                .catch(function () {
                    return $state.target('auth.login');
                });
        });
        $transitions.onStart({
            to: 'auth.*'
        }, function () {
            if (AuthService.isAuthenticated()) {
                return $state.target('app');
            }
        });
    });
