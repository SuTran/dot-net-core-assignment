using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.UnitOfWorks;
using PracticalAssignment.DTO.OutputModels;
using PracticalAssignment.Infrastructure.ContanstCommon;
using PracticalAssignment.Services.InterfaceServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PracticalAssignment.Services.ImplServices
{
    public class LibraryService : ILibraryService
    {
        private readonly IUnitOfWork _uow;
        public LibraryService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public List<LibraryViewModel> GetAllLibraries()
        {
            var query = _uow.Libraries.GetAll()
                .Select(x => new LibraryViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToList();
            return query;
        }

        public LibraryViewModel GetLibraryById(Guid id)
        {
            var query = _uow.Libraries.GetAll()
                .Where(x => x.Id == id)
                .Select(x => new LibraryViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).FirstOrDefault();

            return query;

        }

        public void Insert(OutputLibraryViewModel dto, out bool status, out string message)
        {
            try
            {
                if (string.IsNullOrEmpty(dto.Name))
                {
                    status = false;
                    message = MesssageContant.EMPTY_NAME;
                }
                else if(dto.Name.Length > 255)
                {
                    status = false;
                    message = MesssageContant.VALIDATE_NAME;
                }
                else
                {
                    if(GetLibraryByName(dto.Name)==false)
                    {
                        var model = new Library
                        {
                            Id = Guid.NewGuid(),
                            Name = dto.Name,
                            Description = dto.Description
                        };

                        _uow.Libraries.Insert(model);
                        _uow.Save();
                        status = true;
                        message = MesssageContant.SAVE_SUCCESS;
                    }
                    else
                    {
                        status = false;
                        message = MesssageContant.DUPLICATE_NAME;
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private bool GetLibraryByName(string name)
        {
            var query = _uow.Libraries.GetAny(x => x.Name == name);
            if(query!= false)
            {
                return query;
            }
            return false;
        }
    }
}