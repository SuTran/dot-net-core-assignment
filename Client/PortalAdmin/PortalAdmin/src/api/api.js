let ApiBase = {
    BaseUrl: "http://localhost:5001",
    EndPoint: "/api/"
};
let Urls = {
    LibraryApi: {
        GetListAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Library',
        InsertAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Library'
    },
    DocumentApi: {
        GetDataByIdAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Document/',
        UploadFileAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Document'
    },
    UserApi: {
        LoginAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'User',
        GetUserByIdAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'User/'
    }
};