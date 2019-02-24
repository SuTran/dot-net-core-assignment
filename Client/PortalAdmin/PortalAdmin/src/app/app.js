/*==import module==*/
let moduleName = 'appHome';
let modules = [
    "ui.router",
    "ngSanitize",
    "oc.lazyLoad"
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
let nested_pages= {
    url: "/",
    cache: false,
    templateUrl: "views/common/layout-home.html",
    controller: "loginCtrl",
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
let nested_pages_home = {
    url: "home",
    cache: false,
    templateUrl: "views/pages/home/home.html",
    controller: "loginCtrl",
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
let nested_pages_library = {
    url: "library",
    cache: false,
    templateUrl: "views/pages/library/library.html",
    controller: "loginCtrl",
    resolve: {
        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
            return $ocLazyLoad.load({
                files: [
                    "src/controllers/libraryCtrl/libraryCtrl.js"
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
        //.state("layout-home", {
        //    cache: false,
        //    abstract: false,
        //    templateUrl: "views/layouts/layout-home.html",
        //    resolve: {
        //        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
        //            return $ocLazyLoad.load({
        //                files: [
        //                    "src/controllers/homeCtrl/homeCtrl.js"
        //                ]
        //            });
        //        }],
        //        title: ["$rootScope", ($rootScope) => {
        //            $rootScope.title = "Library System Management | Home Page";
        //        }]
        //    }
        //})
        //.state("layout-home.home", {
        //    url: "/",
        //    cache: false,
        //    templateUrl: "views/pages/home.html",
        //    controller: "homeCtrl",
        //    resolve: {
        //        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
        //            return $ocLazyLoad.load({
        //                files: [
        //                    "src/controllers/homeCtrl/homeCtrl.js"
        //                ]
        //            });
        //        }],
        //        title: ["$rootScope", ($rootScope) => {
        //            $rootScope.title = "Library System Management | Home Page";
        //        }]
        //    }
        //})
        //.state("layout-home.libraries", {
        //    url: "/libraries",
        //    cache: false,
        //    templateUrl: "views/pages/library/libraries.html",
        //    controller: "libraryCtrl",
        //    resolve: {
        //        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
        //            return $ocLazyLoad.load({
        //                files: [
        //                    "src/controllers/libraryCtrl/libraryCtrl.js"
        //                ]
        //            });
        //        }],
        //        title: ["$rootScope", ($rootScope) => {
        //            $rootScope.title = "Library System Management | Home Page";
        //        }]
        //    }
        //})

        //.state("layout-home.login", {
        //    url: "/login",
        //    cache: false,
        //    templateUrl: "views/pages/login/login.html",
        //    controller: "loginCtrl",
        //    resolve: {
        //        loadMyCtrl: ["$ocLazyLoad", ($ocLazyLoad) => {
        //            return $ocLazyLoad.load({
        //                files: [
        //                    "src/controllers/loginCtrl/loginCtrl.js"
        //                ]
        //            });
        //        }],
        //        title: ["$rootScope", ($rootScope) => {
        //            $rootScope.title = "Library System Management | Home Page";
        //        }]
        //    }
        //});
        .state("login", nested_login)
        .state("pages", nested_pages)
        .state("pages.home", nested_pages_home)
        .state("pages.library", nested_pages_library)


    $urlRouterProvider.otherwise('/');
    $compileProvider.debugInfoEnabled(false);
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
});

appHome.run(($state, $rootScope, $location, $http, $templateCache) => {
    $rootScope.$on('$locationChangeSuccess', function () {
        var ckAuth = AngularjsCommon.GetlocalStorage(AngularjsToken.UserName);
        if (ckAuth && ckAuth.length) {
            $state.go("pages.home");
        } else {
            $state.go("login");
        }
    });
});