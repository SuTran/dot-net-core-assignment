appHome.controller("homeCtrl", HomeController);
HomeController.$inject = ["$scope", "dataService", '$state'];
function HomeController($scope, dataService, $state) {
    $scope.flatBtn = false;
    $scope.user = {
        userName: '',
        isAdmin: false
    };
    this.$onInit = () => {
        $scope.checkLogin();
    };

    $scope.checkLogin = () => {
        try {
            const data = AngularjsCommon.GetlocalStorage(AngularjsToken.UserName);
            if (data !== null) {
                var user = JSON.parse(data);
                $scope.user.userName = user.username;
                $scope.user.isAdmin = user.isAdmin;
                $scope.flatBtn = true;
            } else {
                $scope.flatBtn = false;
            }
        }
        catch{
            $state.go('login');
        }
    }

    $scope.logout = () => {
        AngularjsCommon.RemoveLocalStorage(AngularjsToken.UserName);
        $state.go('login');
    }
}