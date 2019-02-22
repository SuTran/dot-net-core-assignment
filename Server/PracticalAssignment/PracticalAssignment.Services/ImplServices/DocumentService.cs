using Microsoft.AspNetCore.Http;
using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.UnitOfWorks;
using PracticalAssignment.DTO.ViewModels;
using PracticalAssignment.Infrastructure.ContanstCommon;
using PracticalAssignment.Infrastructure.Extensions;
using PracticalAssignment.Services.InterfaceServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace PracticalAssignment.Services.ImplServices
{
    public class DocumentService : IDocumentService
    {
        private readonly IUnitOfWork _uow;
        private readonly ILibraryService _libraryService;
        public DocumentService(IUnitOfWork uow, ILibraryService libraryService)
        {
            _uow = uow;
            _libraryService = libraryService;
        }

        public List<DocumentOutputViewModel> GetAllByLibraryId(Guid libraryId)
        {
            var query = _uow.Documents.GetAll()
                .Where(x=>x.LibraryId==libraryId)
                .Select(x => new DocumentOutputViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    FileUrl=x.FileUrl,
                    LibraryId=x.LibraryId,
                    Description = x.Description
                }).ToList();
            return query;
        }

        public void UploadFile(FileInputViewModel model,out bool status, out string message)
        {
            try
            {
                if (model.FileUrl == null || model.FileUrl.Length == 0)
                {
                    status = false;
                    message = MesssageContant.FILE_NULL;
                }
                else
                {

                    var libData = _libraryService.GetLibraryById(model.LibraryId);
                    if (libData != null)
                    {
                        var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/");

                        var folder = Directory.CreateDirectory(rootPath + libData.Name);
                        //var subPath = Path.Combine(rootPath, libData.Name);
                        var newpath = Path.Combine(rootPath, libData.Name);
                        var path = Path.Combine(newpath, model.FileUrl.GetFilename());

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            model.FileUrl.CopyToAsync(stream);
                        }
                        var dto = new DocumentViewModel
                        {
                            LibraryId = model.LibraryId,
                            FileUrl = path,
                            Name = model.FileUrl.GetFilename(),
                            Description = model.Description
                        };
                        Insert(dto);
                        status = true;
                        message = MesssageContant.UPLOAD_SUCCESS;
                    }
                    else
                    {
                        status = false;
                        message = MesssageContant.UPLOAD_FAIL;
                    }
                }
            }
            catch (Exception ex)
            {
                status = true;
                message = "Upload Failed: " + ex.Message;
            }

        }

        private void Insert(DocumentViewModel dto)
        {
            try
            {
                var model = new Document
                {
                    Id = Guid.NewGuid(),
                    Name = dto.Name,
                    FileUrl=dto.FileUrl,
                    Description = dto.Description,
                    LibraryId=dto.LibraryId 
                };

                _uow.Documents.Insert(model);
                _uow.Save();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
