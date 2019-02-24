appHome.controller("libraryCtrl", libraryController);
libraryController.$inject = ["$scope", "dataService", '$state'];
function libraryController($scope, dataService, $state) {
    $scope.flatBtn = false;
    $scope.user = {
        userName: ''
    };
    this.$onInit = () => {
        console.log('library');
    };
}