var AngularjsToken = {
    AuthBasic: "plesk_admin_auth_basic",
    UserName: "plesk_admin_username",
    Token: "plesk_admin_access_token",
    lag: "vn",
    Skin: "plesk_admin_skin"
}
var AngularjsDefaultImg = {
    DefaultPhoto: "./defaultPhoto/logo.png"
}
var AngularjsCommon = {
    /*--Kiểm tra có hỗ trợ Storage hay không--*/
    CheckStorage: function () {
        if (typeof (Storage) !== "undefined") {
            return true;
        }
        else {
            return false;
        }
    },
    /*--Lưu dữ liệu vào localStorage--*/
    SavelocalStorage: function (_key, _value) {
        var self = AngularjsCommon;
        if (self.CheckStorage()) {
            window.localStorage.setItem(_key, _value);
        }
        else {
            console.log("Storage không được hỗ trợ");
        }
    },
    /*--Lấy dữ liệu từ localStorage--*/
    GetlocalStorage: function (_key) {
        var self = AngularjsCommon;
        if (self.CheckStorage()) {
            return window.localStorage.getItem(_key);
        }
        else {
            console.log("Storage không được hỗ trợ");
        }
    },
    /*--Xoá dữ liệu từ localStorage--*/
    RemoveLocalStorage: function (_key) {
        var self = AngularjsCommon;
        if (self.CheckStorage()) {
            return window.localStorage.removeItem(_key);
        }
        else {
            console.log("Storage không được hỗ trợ");
        }
    },
    /*--Lưu dữ liệu vào sessionStorage--*/
    SaveSessionStorage: function (_key, _value) {
        var self = AngularjsCommon;
        if (self.CheckStorage()) {
            window.sessionStorage.setItem(_key, _value);
            console.log("Lưu vào Storage thành công");
        }
        else {
            console.log("Storage không được hỗ trợ");
        }
    },
    /*--Lấy dữ liệu từ SessionStorage--*/
    GetSessionStorage: function (_key, IdMsg) {
        var self = AngularjsCommon;
        if (self.CheckStorage()) {
            return window.sessionStorage.getItem(_key);
        }
        else {
            console.log("Storage không được hỗ trợ");
        }
    },
    /*--Xoá dữ liệu từ SessionStorage--*/
    RemoveSessionStorage: function (_key, IdMsg) {
        var self = AngularjsCommon;
        if (self.CheckStorage()) {
            return window.sessionStorage.removeItem(_key);
        }
        else {
            console.log("Storage không được hỗ trợ");
        }
    },
}
var AngularjsInterFace = {
    ShowNotify: function (_type, _title, _content, $scope) {
        //success,info,warning,error
        var notify = {
            type: _type,
            title: _title,
            content: _content,
            timeout: 3200
        };
        $scope.$emit("notify", notify);
    },
    GrowlSucess: function (_titile, _message) {
        jQuery.growl.notice({ title: _titile, message: _message });
    },
    GrowlError: function (_titile, _message) {
        jQuery.growl.error({ title: _titile, message: _message });
    },
    GrowlWarning: function (_titile, _message) {
        jQuery.growl.warning({ title: _titile, message: _message });
    },
    ShowModal: function (idModal) {
        jQuery(idModal).modal("show");
    },
    HideModal: function (idModal) {
        jQuery(idModal).modal("hide");
    },
    readURL: function (input, idImg) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                jQuery(idImg).attr("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    },
    base64: function (file, callback) {
        var coolFile = {};
        function readerOnload(e) {
            var base64 = btoa(e.target.result);
            coolFile.base64 = base64;
            callback(coolFile)
        };

        var reader = new FileReader();
        reader.onload = readerOnload;

        var file = file[0].files[0];
        coolFile.filetype = file.type;
        coolFile.size = file.size;
        coolFile.filename = file.name;
        reader.readAsBinaryString(file);
    },
    ShowLoading: function () {
        jQuery("#dvLoadingRequest").css("display", "block");
    },
    HideLoading: function () {
        jQuery("#dvLoadingRequest").css("display", "none");
    },
    ShowSpinner: (id) => {
        jQuery(id).show();
    },
    HideSpinner: (id) => {
        jQuery(id).hide();
    },
    EditorMini: function (id) {
        jQuery(id).froalaEditor({
            language: "vi",
            toolbarInline: false,
            charCounterCount: false,
            toolbarVisibleWithoutSelection: false,
            toolbarButtons: ["bold", "italic", "underline", "align", "formatOL", "formatUL", "indent", "outdent", "undo", "redo"],
            pluginsEnabled: [],
            height: 100
        });
    },
    AlertNotice: (_msg) => {
        $().toastmessage("showNoticeToast", _msg);
    },
    AlertSuccess: (_msg) => {
        $().toastmessage("showSuccessToast", _msg);
    },
    AlertWarning: (_msg) => {
        $().toastmessage("showWarningToast", _msg);
    },
    AlertError: (_msg) => {
        $().toastmessage("showErrorToast", _msg);
    },
    AlertConfrim: (_title, _mes, _btnYes, _btnNo, opt) => {
        let DefaultOpt = jQuery.extend({
            title: _title,
            text: _mes,
            no_btn: _btnNo,
            yes_btn: _btnYes,
            no_fn: () => {
                return false;
            },
            yes_fn: () => { }
        }, opt);
        ymz.jq_confirm(DefaultOpt);
    },
    DateTimePicker: (id) => {
        jQuery(id).datetimepicker({
            format: "DD-MM-YYYY"
        });
    },
    MaskInputDate: (id) => {
        jQuery(id).mask("99-99-9999", {
            placeholder: "dd-mm-yyyy",
        });
    },
    MaskInputDateExtends: (id) => {
        jQuery(id).mask("9999-99-99", {
            placeholder: "yyyy-mm-dd",
        });
    },
    ShowPhotoEditor: (linkImg, TitleImg, opt) => {
        pixlr.overlay.show({
            image: linkImg,
            title: TitleImg,
            referrer: "StyLish",

        }, opt);
    },
    OpenPhotoEditor: () => {
        pixlr.overlay.show()
    },
    OpenCkfinder: (Id) => {
        let finder = new CKFinder();
        finder.selectActionFunction = (fileUrl) => {
            jQuery(Id).val(fileUrl);
        };
        finder.popup();
    },
    FormatDecimal: (alias, opt) => {
        //numeric
        let defaultOpt = jQuery.extend({
            radixPoint: ".",
            groupSeparator: ",",
            digits: 2,
            autoGroup: true,
            prefix: "",
            rightAlign: false,
            autoUnmask: true,
            oncleared: () => { self.Value(""); }
        }, opt);
        jQuery("input[data-decimal-input]").inputmask(alias, defaultOpt);
    },
    FomatDateTimePicker: (alias, optMask, optDateTimePicker) => {
        //alias dd/mm/yyyy
        let defaultOptMask = jQuery.extend({
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "-02-29",
            separator: "-",
            alias: alias
        }, optMask);
        jQuery("input[data-datetime-input]").inputmask(defaultOptMask);

        let defaultOptDateTimePicker = jQuery.extend({
            locale: "vi",
            format: "DD-MM-YYYY"
        }, optDateTimePicker);
        jQuery("div[data-datetime-group]").datetimepicker(defaultOptDateTimePicker);
    },
    FormatIDCard: () => {
        jQuery("input[data-idCard-input]").inputmask("9999-99-999");
    }
}
//var AngularjsServerRealTime = {
//    ServerBase: ConfigApiUrl.SignalrHub,
//    SignalRInit: () => {
//        let tryingToReconnect = false;
//        jQuery.connection.hub.url = AngularjsServerRealTime.ServerBase;
//        jQuery.connection.hub.logging = ConfigApiUrl.SignalrLog;
//        /*==Start-Hubs==*/
//        jQuery.connection.hub.start({ transport: ["webSockets", "longPolling"] })
//            .done(() => {
//                jQuery("div[data-status-bar]").remove();
//            })
//            .fail(() => {
//                AngularjsInterFace.AlertError("Không thể kết nối tới máy chủ thời gian thực");
//            });
//        /*==Notify the user about disconnections==*/
//        jQuery.connection.hub.connectionSlow(() => {
//            AngularjsServerRealTime.InitStatusBar("Thông báo", "Có lỗi xảy ra trong quá trình kết nối");
//        });
//        /*==Reconnecting==*/
//        jQuery.connection.hub.reconnecting(() => {
//            AngularjsServerRealTime.InitStatusBar("Thông báo", "Đang kết nối lại với máy chủ...");
//            tryingToReconnect = true;
//        });
//        /*==Reconnected==*/
//        jQuery.connection.hub.reconnected(() => {
//            AngularjsInterFace.AlertSuccess("Kết nối lại thành công");
//            jQuery("div[data-status-bar]").remove();
//        });
//        /*==Disconnected==*/
//        jQuery.connection.hub.disconnected(() => {
//            if (tryingToReconnect) {
//                jQuery.connection.hub.start({ transport: ["webSockets", "longPolling"] });
//            }
//        });
//    },
//    InitStatusBar: (_title, _message) => {
//        let html = "<div data-status-bar class=\"alert alert-danger status-bar\">";
//        html += "<strong>" + _title + " " + "</strong>" + " " + _message;
//        html += "</div>";
//        jQuery("body").prepend(html);
//    }
//};
var KendoUI = {
    InitWindow: (idWindow, title, width, height, opts) => {
        let window = jQuery(idWindow);
        let defaultOpts = jQuery.extend({
            title: title,
            width: width,
            height: height,
            visible: false,
            resizable: false,
            modal: true,
            pinned: true,
            actions: ["Maximize"],
        }, opts);
        window.kendoWindow(defaultOpts).data("kendoWindow").center();
    },
    OpenWindow: (idWindow, title, width, height, opts) => {
        let window = jQuery(idWindow);
        let defaultOpts = jQuery.extend({
            title: title,
            width: width,
            height: height,
            visible: false,
            resizable: false,
            modal: true,
            pinned: true,
            actions: ["Maximize"],
        }, opts);
        window.kendoWindow(defaultOpts).data("kendoWindow").center().open();
    },
    CloseWindow: (idWindow) => {
        let window = jQuery(idWindow);
        window.data("kendoWindow").close();
    },
    GridResize: (headerId, contentId, gridId) => {
        let header = jQuery(headerId);
        let content = jQuery(contentId);
        let grid = jQuery(gridId);

        //Other variables
        let minimumAcceptableGridHeight = 350; //This is roughly 5 rows 
        let otherElementsHeight = 0;

        //Get Window Height 
        let windowHeight = jQuery(window).innerHeight();

        //Get Header Height if its existing
        let hasHeader = header.length;
        let headerHeight = hasHeader ? header.outerHeight(true) : 0;

        //Get the Grid Element and Areas Inside It
        var contentArea = grid.find(".k-grid-content");  //This is the content Where Grid is located
        let otherGridElements = grid.children().not(".k-grid-content"); //This is anything ather than the Grid iteslf like header, commands, etc

        //Calcualte all Grid elements height
        otherGridElements.each(function () {
            otherElementsHeight += jQuery(this).outerHeight(true);
        });

        //Get other elements same level as Grid
        let parentDiv = grid.parent("div");

        let hasMainContent = parentDiv.length;
        if (hasMainContent) {
            let otherSiblingElements = content.children()
                .not(gridId)
                .not("script");

            //Calculate all Sibling element height
            otherSiblingElements.each(function () {
                otherElementsHeight += jQuery(this).outerHeight(true);
            });
        }

        //Padding you want to apply below your page
        let bottomPadding = 0;

        //Check if Calculated height is below threshold
        let calculatedHeight = windowHeight - headerHeight - otherElementsHeight - bottomPadding;
        let finalHeight = calculatedHeight < minimumAcceptableGridHeight ? minimumAcceptableGridHeight : calculatedHeight;

        //Apply the height for the content area
        contentArea.height(finalHeight);
    },
    FixHeightContent: (PaddingHeight,ContentId) => {
        let LayoutOption = {
            PaddingHeight: PaddingHeight
        };
        let Height = jQuery(window).height() - LayoutOption.PaddingHeight;
        jQuery(ContentId).css("height", Height);
    },
    HideColumn: (idGrid, indexCol) => {
        let grid = jQuery(idGrid).data("kendoGrid");
        grid.hideColumn(indexCol);
    },
    ShowColumn: (idGrid, indexCol) => {
        let grid = jQuery(idGrid).data("kendoGrid");
        grid.showColumn(indexCol);
    },
};