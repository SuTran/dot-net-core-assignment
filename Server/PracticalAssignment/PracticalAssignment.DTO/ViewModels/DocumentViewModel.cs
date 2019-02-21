using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.DTO.ViewModels
{
    public class DocumentViewModel
    {
        public string Name { get; set; }
        public string FileUrl { get; set; }
        public string Description { get; set; }
        public Guid LibraryId { get; set; }
    }

    public class DocumentOutputViewModel: DocumentViewModel
    {
        public Guid Id { get; set; }
    }
}
