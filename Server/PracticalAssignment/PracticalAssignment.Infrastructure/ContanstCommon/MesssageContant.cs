using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Infrastructure.ContanstCommon
{
    public struct MesssageContant
    {
        public const string EMPTY_NAME = "Please enter library name";
        public const string DUPLICATE_NAME = "Duplicate library name";

        public const string FILE_NULL = "File not selected";
        public const string UPLOAD_SUCCESS = "Upload Successful";
        public const string UPLOAD_FAIL = "Library not found";


        public const string SAVE_SUCCESS = "Save successfully";
        public const string SAVE_FAIL = "Save fail";

        public const string UPDATE_SUCCESS = "Update successfully";
        public const string UPDATE_FAIL = "Update fail";

        public const string DELETE_SUCCESS = "Delete successfully";
        public const string DELETE_FAIL = "Delete fail";
    }

    public struct MessageResponse
    {
        public const string CALL_API_SUCCESS = "Call API Success";
        public const string DATA_NOT_FOUND = "Data Not Found";

    }
}
