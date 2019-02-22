const ApiBase = {
    BaseUrl: 'https://localhost:5001',
    EndPoint: '/api/'
};

export const Urls = {
    LibraryApi: {
        GetListAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Library/get-all',
        InsertAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Library/insert',
    },
    DocumentApi: {
        GetDataByIdAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Document/get-all/',
        UploadFileAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Document/upload-file',
    },
    UserApi: {
        LoginAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'User/login',
        GetUserByIdAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'User/'
    }
};
