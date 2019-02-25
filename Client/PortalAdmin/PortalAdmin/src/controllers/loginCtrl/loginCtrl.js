appHome.controller("loginCtrl", LoginController); 
LoginController.$inject = [
    "$scope",
    "$state",
    "dataService"

];
function LoginController($scope, $state,dataService) {
 
     $scope.user = {
        userName: ''
    };
    this.$onInit = () => {

    };
    $scope.login = () => {
        const objData = {
            username: $scope.user.userName
        };
        dataService.PostData(Urls.UserApi.LoginAsync, objData)
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    $scope.getUser(objData.username);
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
    $scope.getUser = (userName) => {
        dataService.GetData(Urls.UserApi.GetUserByIdAsync + userName, [])
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    const user = JSON.stringify(data.data);
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