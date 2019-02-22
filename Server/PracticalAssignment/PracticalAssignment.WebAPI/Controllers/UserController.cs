using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PracticalAssignment.DTO.ViewModels;
using PracticalAssignment.Infrastructure.ContanstCommon;
using PracticalAssignment.Infrastructure.LibCommon;
using PracticalAssignment.Services.InterfaceServices;

namespace PracticalAssignment.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> LoginAsync(LoginViewModel username)
        {
            var status = false;
            var message = string.Empty;
            var Result = new Res();
            await Task.Run(() => _userService.Login(username, out status, out message));
            if (status)
            {
                Result.Status = status;
                Result.Message = message;
            }
            else
            {
                Result.Data = null;
                Result.Status = status;
                Result.Message = message;
            }
            return Ok(Result);
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserById(string username)
        {
            var Result = new Res();
            try
            {
                var data = await Task.Run(() => _userService.GetUserById(username));
                if (data != null)
                {
                    Result.Data = data;
                    Result.Status = true;
                    Result.Message = MessageResponse.CALL_API_SUCCESS;
                }
                else
                {
                    Result.Data = null;
                    Result.Status = false;
                    Result.Message = MessageResponse.DATA_NOT_FOUND;
                }

                return Ok(Result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}