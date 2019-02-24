/*==import module==*/
let moduleName = "appAuth";
let moduleConfig = [
    'ui.router', 'ngSanitize', 'oc.lazyLoad'
];
/*==define state router==*/
let nested_login = {
    url: "/login",
    cache: false,
    templateUrl: "views/login/login.html",
    controller: "loginCtrl",
    resolve: {
        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
            return $ocLazyLoad.load({
                files: [
                    "src/controllers/loginCtrl/loginCtrl.js"
                ]
            });
        }],
        title: ["$rootScope", ($rootScope) => {
            $rootScope.title = "Nine Tailed Fox | Software";
        }]
    }
};
var appAuth = angular.module(moduleName, moduleConfig);
appAuth.config(($stateProvider, $urlRouterProvider, $locationProvider,
    $controllerProvider, $ocLazyLoadProvider, $compileProvider) => {
    appAuth.controller = $controllerProvider.register;
    $urlRouterProvider
        .state("login", nested_login)
        .otherwise({ redirectTo: '/login' });
    $compileProvider.debugInfoEnabled(false);
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
});
