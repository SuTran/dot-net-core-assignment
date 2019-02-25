using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Infrastructure.ContanstCommon
{
    public struct MesssageContant
    {
        public const string VALIDATE_NAME = "Enter name exceeds 255 characters";
        public const string VALIDATE_FILE_NAME = "Enter file name exceeds 255 characters";
        public const string CHECK_FILE = "Support file type pdf ";
        public const string VALIDATE_NAME_CHARACTERS = "A filename cannot contain any of the following characters: '\' / : * ? ' < > | ";

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

        public const string LOGIN_SUCCESS = "Login successfully";
        public const string LOGIN_FAIL = "Incorrect username";

    }

    public struct MessageResponse
    {
        public const string CALL_API_SUCCESS = "Call API Success";
        public const string DATA_NOT_FOUND = "Data Not Found";

    }
}
