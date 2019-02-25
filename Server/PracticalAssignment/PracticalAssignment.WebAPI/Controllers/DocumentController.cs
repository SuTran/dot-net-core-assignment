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
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetById(Guid libraryId)
        {
            var Result = new Res();
            try
            {
                var data = await Task.Run(() => _documentService.GetAllByLibraryId(libraryId));
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


        [HttpPost]
        public async Task<IActionResult> UploadFileAsync([FromForm]FileInputViewModel model)
        { 
            var status = false;
            var message = string.Empty;
            var Result = new Res();
            await Task.Run(() => _documentService.UploadFile(model, out status, out message));
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