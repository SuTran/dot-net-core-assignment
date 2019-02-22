using PracticalAssignment.DTO.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Services.InterfaceServices
{
    public interface IUserService
    {
        void Login(LoginViewModel model, out bool status, out string message);
        UserViewModel GetUserById(string model);
    }
}
