appHome.controller("homeCtrl", HomeController);
HomeController.$inject = ["$scope", "dataService"];
function HomeController($scope, dataService) {
    this.$onInit = () => {
        console.log('home')
    };
}