using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Infrastructure.Models
{
    public class ResponseModel
    {
        public ErrorModel Error { get; set; }

        public object Data { get; set; }
    }
}
