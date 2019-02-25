using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace PracticalAssignment.Infrastructure.Extensions
{
    public static class Validate
    {
        public static bool CheckValidateImg(string FileName, string[] Exts)
        {
            var Extensions = Path.GetExtension(FileName);
            if (Exts == null)
            {
                Exts = ValidateFile.AllowedImageExtsDefault;
            }
            for (var i = 0; i < Exts.Length; i++)
            {
                if (Extensions == Exts[i])
                {
                    return true;
                }
            }
            return false;
        }
        public static bool CheckValidateFile(string FileName, string[] Exts)
        {
            var Extensions = Path.GetExtension(FileName);
            if (Exts == null)
            {
                Exts = ValidateFile.AllowedFileExtsDefault;
            }
            for (var i = 0; i < Exts.Length; i++)
            {
                if (Extensions == Exts[i])
                {
                    return true;
                }
            }
            return false;
        }
        public static bool CheckSize(int Size, int SizeUpload)
        {
            if (Size == 0)
            {
                ValidateFile.Size = Size;
            }
            if (SizeUpload <= Size)
            {
                return true;
            }
            return false;
        }
        public static bool CheckFolderExists(string Path)
        {
            if (Directory.Exists(Path))
            {
                return true;
            }
            return false;
        }
        public static string DisplayExtensions(string[] Exts)
        {
            var separator = ", ";
            return string.Join(separator, Exts);
        }

        public static bool CheckFileType(string fileName)
        {
            string ext = Path.GetExtension(fileName);
            switch (ext.ToLower())
            {
                case ".pdf":
                    return true;
                default:
                    return false;
            }
        }

        public static bool CheckNameCharacter(string valueName)
        {
            var validateRegex = new Regex(@"[~`!@#$%^&*()-+=|\{}':;.,<>/?]");

            if (validateRegex.IsMatch(valueName))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
