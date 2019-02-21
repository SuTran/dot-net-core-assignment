using Microsoft.AspNetCore.Http;
using PracticalAssignment.DTO.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Services.InterfaceServices
{
    public interface IDocumentService
    {
        void UploadFile(IFormFile fileUrl, Guid libraryId, out bool status, out string message);
        List<DocumentOutputViewModel> GetAllByLibraryId(Guid libraryId);
        //void UploadFile(IFormFile file, out bool status, out string message);
    }
}
