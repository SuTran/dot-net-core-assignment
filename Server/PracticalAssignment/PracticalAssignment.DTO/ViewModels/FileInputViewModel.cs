using Microsoft.AspNetCore.Http;
using System;

namespace PracticalAssignment.DTO.ViewModels
{
    public class FileInputViewModel
    {
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public Guid LibraryId { get; set; }

    }
}
