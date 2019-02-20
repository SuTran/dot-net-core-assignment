using System;

namespace PracticalAssignment.DTO.OutputModels
{
    public class LibraryViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class OutputLibraryViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
