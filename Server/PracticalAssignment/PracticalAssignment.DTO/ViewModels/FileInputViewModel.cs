using Microsoft.AspNetCore.Http;
using System;

namespace PracticalAssignment.DTO.ViewModels
{
    public class FileInputViewModel
    {
        public IFormFile FileUrl { get; set; }
        public Guid LibraryId { get; set; }

    }
}
