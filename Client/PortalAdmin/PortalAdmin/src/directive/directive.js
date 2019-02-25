appHome.directive("paggingBoostrap", () => {
    return {
        restrict: "E",
        scope: {
            page: "@",
            totalPage: "=",
            callBackMethod: "&goToPage"
        },
        controller: ($scope) => {
            angular.element(() => {
                $scope.ActiveClass(1);
            });
            $scope.Pagging = (p) => {
                if (p !== null) {
                    $scope.callBackMethod({
                        page: p
                    });
                }
                else {
                    alert("Vui lòng truyền vào số trang");
                }
            };
            $scope.ActiveClass = (item) => {
                $scope.selected = item;
            };
            $scope.IsActiveClass = (item) => {
                return $scope.selected === item;
            };
        },
        templateUrl: "src/views/components/pagination/pagination.html"
    };
});
appHome.directive("fileModel", ["$parse", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind("change", function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);