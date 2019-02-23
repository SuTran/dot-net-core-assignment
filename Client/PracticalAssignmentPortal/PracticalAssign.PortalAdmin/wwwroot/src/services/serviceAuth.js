appAuth.service("dataService", function ($http, $httpParamSerializer) {
    /*--Get--*/
    this.Get = function (uri, opt) {
        let configGet = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        return $http.get(uri, angular.extend(configGet, opt));
    }
    /*--Post-Data--*/
    this.Post = function (uri, objs, opt) {
        let configGet = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        return $http.post(uri, objs, angular.extend(configGet, opt));
    }
});