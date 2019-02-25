appHome.controller("libraryCtrl", libraryController);
libraryController.$inject = ["$scope", "dataService", '$state', '$stateParams','dataServiceFileUpload'];
function libraryController($scope, dataService, $stateParams, $state, dataServiceFileUpload) {
    $scope.item = {
        name: '',
        description: ''
    };
    this.$onInit = () => {
        $scope.geListLibrary();
    };
    $scope.inputControl = {
        file: null,
        description: '',
        libId: '',
    }
    $scope.geListLibrary = () => {
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

    $scope.getDocById = (id) => {
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

    $scope.insert = () => {
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
                    $scope.geListLibrary();
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

    $scope.insertUploadFile = (id) => {
        $scope.inputControl.libId = id;
    }

    $scope.uploadFile = () => {
        var formdata = new FormData();
        formdata.append("File", $scope.inputControl.file);
        formdata.append("Description", $scope.inputControl.description);
        formdata.append("LibraryId", $scope.inputControl.libId);

        AngularjsInterFace.DisplayLoading();
        dataServiceFileUpload.UpLoadFile(Urls.DocumentApi.UploadFileAsync, formdata)
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    AngularjsInterFace.AlertSuccess(data.message);
                    $scope.geListLibrary();
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