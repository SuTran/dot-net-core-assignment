appHome.controller("homeCtrl", HomeController);
HomeController.$inject = ["$scope", "dataService", '$state'];
function HomeController($scope, dataService, $state) {
    $scope.flatBtn = false;
    $scope.user = {
        userName: ''
    };
    this.$onInit = () => {
        console.log('home');
        $scope.CheckLogin();
    };

    $scope.CheckLogin = () => {
        try {
            const data = AngularjsCommon.GetlocalStorage(AngularjsToken.UserName);
            if (data !== null) {
                var user = JSON.parse(data);
                console.log('parse', JSON.parse(data));
                $scope.user.userName = user.username;
                console.log('user', $scope.user.userName);

                $scope.flatBtn = true;
            } else {
                $scope.flatBtn = false;
            }
        }
        catch{
            $state.go('login');
        }
    }

    $scope.Logout = () => {
        AngularjsCommon.RemoveLocalStorage(AngularjsToken.UserName);
        $state.go('login');
    }
}