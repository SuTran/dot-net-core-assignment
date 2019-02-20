using PracticalAssignment.DTO.OutputModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace PracticalAssignment.Services.InterfaceServices
{
    public interface ILibraryService
    {
        List<LibraryViewModel> GetAllLibraries();
        LibraryViewModel GetLibraryById(Guid id);
        void Insert(OutputLibraryViewModel dto, out bool status, out string message);
    }
}
