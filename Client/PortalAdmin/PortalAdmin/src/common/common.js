var AngularjsToken = {
    UserName: "user"
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
    //base64: function (file, callback) {
    //    var coolFile = {};
    //    function readerOnload(e) {
    //        var base64 = btoa(e.target.result);
    //        coolFile.base64 = base64;
    //        callback(coolFile)
    //    };

    //    var reader = new FileReader();
    //    reader.onload = readerOnload;

    //    var file = file[0].files[0];
    //    coolFile.filetype = file.type;
    //    coolFile.size = file.size;
    //    coolFile.filename = file.name;
    //    reader.readAsBinaryString(file);
    //},

    DisplayLoading: (opts) => {
        var defaultOpt = jQuery.extend({
            background: "rgba(41, 39, 39, 0.8)",
            imageColor: "#ffff"
        }, opts);
        jQuery.LoadingOverlay("show", defaultOpt);
    },

    HideLoadingNew: () => {
        jQuery.LoadingOverlay("hide");
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