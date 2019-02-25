appHome.controller("libraryCtrl", libraryController);
libraryController.$inject = ["$scope", "dataService", '$state', '$stateParams','dataServiceFileUpload'];
function libraryController($scope, dataService, $stateParams, $state, dataServiceFileUpload) {
    $scope.item = {
        name: '',
        description: ''
    };
    this.$onInit = () => {
        $scope.GeListLibrary();
    };
    $scope.inputControl = {
        fileUrl: null,
        description: '',
        libId: '',
    }
    $scope.GeListLibrary = () => {
        AngularjsInterFace.DisplayLoading();
        dataService.GetData(Urls.LibraryApi.GetListAsync, [])
            .then((res) => {
                var result = res.data;
                if (result.status) {
                    $scope.ArrLibrary = result.data;
                }
                else {
                    AngularjsInterFace.AlertError(data.message);
                }
                AngularjsInterFace.HideLoadingNew();
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.message);
                AngularjsInterFace.HideLoadingNew();
            });
    }

    $scope.GetDocById = (id) => {
        AngularjsInterFace.DisplayLoading();
        dataService.GetData(Urls.DocumentApi.GetDataByIdAsync + id, [])
            .then((res) => {
                var result = res.data;
                if (result.status) {
                    $scope.ArrDocument = result.data;
                }
                else {
                    AngularjsInterFace.AlertError(data.message);
                }
                AngularjsInterFace.HideLoadingNew();
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.message);
                AngularjsInterFace.HideLoadingNew();
            });
    }

    $scope.Insert = () => {
        var objData = {
            name: $scope.item.name,
            description: $scope.item.description
        };
        AngularjsInterFace.DisplayLoading();
        dataService.PostData(Urls.LibraryApi.InsertAsync, objData)
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    AngularjsInterFace.AlertSuccess(data.message);
                    $scope.GeListLibrary();
                }
                else {
                    AngularjsInterFace.AlertError(data.message);
                }
                AngularjsInterFace.HideLoadingNew();
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.message);
                AngularjsInterFace.HideLoadingNew();
            });
    }

    $scope.InsertUploadFile = (id) => {
        $scope.inputControl.libId = id;
    }

    $scope.UploadFile = () => {
        var formdata = new FormData();
        formdata.append("FileUrl", $scope.inputControl.fileUrl);
        formdata.append("Description", $scope.inputControl.description);
        formdata.append("LibraryId", $scope.inputControl.libId);

        AngularjsInterFace.DisplayLoading();
        dataServiceFileUpload.UpLoadFile(Urls.DocumentApi.UploadFileAsync, formdata)
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    AngularjsInterFace.AlertSuccess(data.message);
                    $scope.GeListLibrary();
                }
                else {
                    AngularjsInterFace.AlertError(data.message);
                }
                AngularjsInterFace.HideLoadingNew();
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.message);
                AngularjsInterFace.HideLoadingNew();
            });
    }

}