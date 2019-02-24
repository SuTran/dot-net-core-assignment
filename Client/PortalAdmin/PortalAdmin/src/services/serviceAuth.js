appAuth.service("dataService", function ($http, $httpParamSerializer) {
    /*--Get--*/
    this.GetData = function (_urlApi, _obj, _contentType) {
        var configGet = {
            headers: {
                "Content-Type": _contentType,
            },
            params: _obj
        };
        return $http.get(_urlApi, configGet);
    }
    this.Get = function (uri, opt) {
        let configGet = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        return $http.get(uri, angular.extend(configGet, opt));
    };
    /*--Post-Data--*/
    this.Post = function (uri, objs, opt) {
        let configGet = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        return $http.post(uri, objs, angular.extend(configGet, opt));
    };
    this.PostData = function (_urlApi, _obj) {
        return $http.post(_urlApi, _obj, {
            headers: {
                "Content-Type": "application/json"
            },
        });
    }
});