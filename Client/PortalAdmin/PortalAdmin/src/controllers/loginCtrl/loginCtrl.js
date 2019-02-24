appHome.controller("loginCtrl", LoginController); 
LoginController.$inject = [
    "$scope",
    "$stateParams",
    "$rootScope",
    "$state",
    "dataService",
    "$httpParamSerializer",
    "$element",
    "$location"
];
function LoginController($scope, $stateParams, $rootScope, $state,
    dataService, $httpParamSerializer, $element, $location) {
 
     $scope.user = {
        userName: ''
    };
    this.$onInit = () => {

    };
    $scope.Login = () => {
        const objData = {
            username: $scope.user.userName
        };
        dataService.PostData(Urls.UserApi.LoginAsync, objData)
            .then((res) => {
                let data = res.data;
                console.log(res.data);
                if (data.status) {
                    $scope.GetUser(objData.username);
                    AngularjsInterFace.AlertSuccess(data.message);
                }
                else {
                    AngularjsInterFace.AlertError(data.message);
                }
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.message);
            });
    };
    $scope.GetUser = (userName) => {
        console.log(Urls.UserApi.GetUserByIdAsync + userName);
        dataService.GetData(Urls.UserApi.GetUserByIdAsync + userName, [])
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    const user = JSON.stringify(data.data);
                    //window.location.reload();
                    AngularjsCommon.SavelocalStorage(AngularjsToken.UserName, user);
                    $state.go('pages.home');
                }
                else {
                    AngularjsInterFace.AlertError(data.message);
                }
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.message);
            });
    };
}