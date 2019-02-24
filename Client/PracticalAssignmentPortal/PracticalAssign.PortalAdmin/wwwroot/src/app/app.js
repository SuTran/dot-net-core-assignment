/*==import module==*/
let moduleName = 'appHome';
let modules = [
    "ui.router",
    "ngSanitize",
    "oc.lazyLoad"
];

/*==define state router==*/
let nested_home = {
    url: "/",
    cache: false,
    templateUrl: "views/pages/home/home.html",
    controller: "homeCtrl",
    resolve: {
        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
            return $ocLazyLoad.load({
                files: [
                    "src/controllers/homeCtrl/homeCtrl.js"
                ]
            });
        }],
        title: ["$rootScope", ($rootScope) => {
            $rootScope.title = "Nine Tailed Fox | Software";
        }]
    }
};
var appHome = angular.module(moduleName, modules);
appHome.config(($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $ocLazyLoadProvider, $compileProvider) => {
    appHome.controller = $controllerProvider.register;
    $stateProvider
        .state("home", nested_home)


    $urlRouterProvider.otherwise("/");
    $compileProvider.debugInfoEnabled(false);
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
});
