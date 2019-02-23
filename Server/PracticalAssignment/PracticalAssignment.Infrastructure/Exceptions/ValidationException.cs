using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Infrastructure.Exceptions
{
    public class ValidationException : Exception
    {
        public List<string> Errors { get; set; }

        public ValidationException()
        {
            Errors = new List<string>();
        }

        public ValidationException(List<string> errorDictionary)
        {
            Errors = errorDictionary;
        }
    }
}
