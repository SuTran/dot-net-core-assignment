appAuth.controller("authCtrl", AuthCtrl); 
AuthCtrl.$inject = [
    "$scope",
    "$stateParams",
    "$rootScope",
    "$state",
    "dataService",
    "$httpParamSerializer",
    "$element"
];
function AuthCtrl($scope, $stateParams, $rootScope, $state, dataService, $httpParamSerializer, $element) {
    console.log("dmm");
     $scope.user = {
        userName: ''
    };
    this.$onInit = () => {
        console.log("thuy doan");
        //let selector = $scope.Login;
        //jQuery(document).keypress((e) => {
        //    if (e.which == 13) {
        //        selector.Sigin();
        //    }
        //});
        //jQuery(selector.Controls.btnLogin).click(() => {
        //    selector.Sigin();
        //});
    };
    $scope.Login = () => {
        const objData = {
            username: $scope.user.userName
        };
        console.log('demo', objData.username);
        console.log('url', Urls.UserApi.LoginAsync);
        dataService.PostData(Urls.UserApi.LoginAsync, objData)
            .then((res) => {
                let data = res.data;
                console.log(res.data);
                if (data.status) {
                    $scope.ArrCatChild = data.Data.Records;
                    $scope.totalCount = data.Data.TotalCounts;
                    $scope.pagesCount = data.Data.TotalPages;
                    $scope.page = data.Data.Page;
                    AngularjsInterFace.AlertSuccess(data.Message);
                }
                else {
                    AngularjsInterFace.AlertError(data.Message);
                }
            })
            .catch((data) => {
                AngularjsInterFace.AlertError(data.Message);
                console.log(data);
            });
    };
    //$scope.Login = {
    //    console.log("thuy doan");
    //    //Controls: {
    //    //    frmLogin: "#frmLogin",
    //    //    UserName: "#txtUserName",
    //    //    Passwords: "#txtPassword",
    //    //    btnLogin: "#btnLogin"
    //    //},
    //    //Sigin: () => {
    //    //    let selector = $scope.Login.Controls;
    //    //    let urlBase = "/Admin/Login";
    //    //    let objData = {
    //    //        UserName: jQuery(selector.frmLogin + " " + selector.UserName).val(),
    //    //        Passwords: jQuery(selector.frmLogin + " " + selector.Passwords).val()
    //    //    };
    //    //    jQuery(selector.frmLogin).LoadingOverlay("show");
    //    //    dataService.Post(urlBase, objData)
    //    //        .then((res) => {
    //    //            let data = res.data;
    //    //            if (data.Status) {
    //    //                if (AngularjsCommon.CheckStorage()) {
    //    //                    AngularjsCommon.SavelocalStorage(AngularjsToken.AuthBasic, data.Data);
    //    //                    AngularjsCommon.SavelocalStorage(AngularjsToken.UserName, jQuery(selector.frmLogin + " " + selector.UserName).val());
    //    //                    AngularjsCommon.SavelocalStorage(AngularjsToken.Token, data.Token);
    //    //                    AngularjsInterFace.AlertSuccess(data.Message);
    //    //                    window.location.href = "/";
    //    //                }
    //    //                else {
    //    //                    AngularjsInterFace.AlertError("Trình duyệt của bạn không được hỗ trợ lưu trữ");
    //    //                }
    //    //            }
    //    //            else {
    //    //                AngularjsInterFace.AlertError(data.Message);
    //    //            }
    //    //            jQuery(selector.frmLogin).LoadingOverlay("hide");
    //    //        })
    //    //        .catch((data) => {
    //    //            AngularjsInterFace.AlertError(data);
    //    //            jQuery(selector.frmLogin).LoadingOverlay("hide");
    //    //        });
    //    //}
    //};
}