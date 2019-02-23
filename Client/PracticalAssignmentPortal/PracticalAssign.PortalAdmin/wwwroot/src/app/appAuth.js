/*==import module==*/
let moduleName = "appAuth";
let moduleConfig = [
   'ui.router', 'ngSanitize','oc.lazyLoad'
];
/*==define state router==*/
let nested_login = {
    url: "/",
    cache: false,
    templateUrl: "pleskadmin/sign-in",
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
appAuth.config(($stateProvider, $controllerProvider, $compileProvider,$ocLazyLoadProvider) => {
    appAuth.controller = $controllerProvider.register;

    //$stateProvider
    //    .state("login", nested_login)
    $compileProvider.debugInfoEnabled(false);
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
});
//appAuth.run(($rootScope, $location, $http, $templateCache) => {
//    let ckAuth = AngularjsCommon.GetlocalStorage(AngularjsToken.AuthBasic);
//    let ckUN = AngularjsCommon.GetlocalStorage(AngularjsToken.UserName);
//    let ckToken = AngularjsCommon.GetlocalStorage(AngularjsToken.Token);

//    $rootScope.$on("$viewContentLoaded", () => {
//        $templateCache.removeAll();
//    });

//    if (ckAuth === null || ckAuth === ""
//        && ckUN === null || ckUN === ""
//        && ckckTokenUN === null || ckToken === ""
//        || jQuery.cookie("objectCookie") === null || jQuery.cookie("objectCookie") === ""
//    ) {
//        return;
//    } else {
//        window.location.href = "/";
//    }
//});