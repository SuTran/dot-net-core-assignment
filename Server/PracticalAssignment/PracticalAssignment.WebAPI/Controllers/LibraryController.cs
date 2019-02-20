using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PracticalAssignment.DTO.OutputModels;
using PracticalAssignment.Infrastructure.ContanstCommon;
using PracticalAssignment.Infrastructure.LibCommon;
using PracticalAssignment.Services.InterfaceServices;

namespace PracticalAssignment.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        public readonly ILibraryService _libraryService;
        public LibraryController(ILibraryService libraryService)
        {
            _libraryService = libraryService;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var Result = new Res();
            try
            {
                var data = await Task.Run(() => _libraryService.GetAllLibraries());
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var Result = new Res();
            try
            {
                var data = await Task.Run(() => _libraryService.GetLibraryById(id));
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

        [Route("insert")]
        [HttpPost]
        public async Task<IActionResult> InsertAsync(OutputLibraryViewModel dto)
        {
            var status = false;
            var message = string.Empty;
            var Result = new Res();
            await Task.Run(() => _libraryService.Insert(dto, out status, out message));
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
    }
}