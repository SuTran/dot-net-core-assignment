using PracticalAssignment.Database.UnitOfWorks;
using PracticalAssignment.DTO.ViewModels;
using PracticalAssignment.Infrastructure.ContanstCommon;
using PracticalAssignment.Services.InterfaceServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Services.ImplServices
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _uow;
        public UserService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public void Login(LoginViewModel model, out bool status, out string message)
        {
            var data = CheckUser(model.Username);
            if (data)
            {
                status = true;
                message = MesssageContant.LOGIN_SUCCESS;
            }
            else
            {
                status = false;
                message = MesssageContant.LOGIN_FAIL;
            }
        }

        public UserViewModel GetUserById(string username)
        {
            var query = _uow.Users.FirstOrDefault(x => x.Username == username);

            if (query != null)
            {
                return new UserViewModel
                {
                    Id = query.Id,
                    Username = query.Username,
                    IsAdmin = query.IsAdmin
                };
            }
            return null;
        }

        private bool CheckUser(string username)
        {
            var query = _uow.Users.GetAny(x => x.Username == username);
            if (query)
            {
                return query;
            }
            return false;
        }
    }
}
