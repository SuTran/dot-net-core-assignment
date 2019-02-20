using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PracticalAssignment.DTO.ViewModels;
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
        [Route("upload-file")]
        [HttpPost]
        public async Task<IActionResult> InsertAsync(IFormFile fileUrl, Guid libraryId)
        {
            var status = false;
            var message = string.Empty;
            var Result = new Res();
            await Task.Run(() => _documentService.UploadFile(fileUrl,libraryId, out status, out message));
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