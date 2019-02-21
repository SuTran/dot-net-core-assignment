const ApiBase = {
    BaseUrl: 'https://localhost:5001',
    EndPoint: '/api/'
};

export const Urls = {
    LibraryApi: {
        GetListAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Library/get-all',
        InsertAsync: ApiBase.BaseUrl + ApiBase.EndPoint + 'Library/insert',
    },

};
