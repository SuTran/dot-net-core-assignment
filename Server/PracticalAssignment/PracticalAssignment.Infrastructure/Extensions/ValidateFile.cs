using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Infrastructure.Extensions
{
    public static class ValidateFile
    {
        public static int Size = 5000000;

        public static string[] AllowedImageExtsDefault = new string[]
        {
            "gif", "jpeg", "jpg", "png","JPG"
        };
        public static string[] AllowedFileExtsDefault = new string[]
        {
            "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "pdf"
        };
        public static string[] AllowedFileExtsFullDefault = new string[]
        {
            "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "pdf", "gif", "jpeg", "jpg", "png"
        };
    }
}
