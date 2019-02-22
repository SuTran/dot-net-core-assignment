using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.DTO.ViewModels
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
    }
}
