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

        public void UploadFile(IFormFile fileUrl, Guid libraryId,
            out bool status, out string message)
        {
            try
            {
                if (fileUrl == null || fileUrl.Length == 0)
                {
                    status = false;
                    message = MesssageContant.FILE_NULL;
                }
                else
                {

                    var libData = _libraryService.GetLibraryById(libraryId);
                    if (libData != null)
                    {
                        var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/");

                        var folder = Directory.CreateDirectory(rootPath + libData.Name);
                        //var subPath = Path.Combine(rootPath, libData.Name);
                        var newpath = Path.Combine(rootPath, libData.Name);
                        var path = Path.Combine(newpath, fileUrl.GetFilename());

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            fileUrl.CopyToAsync(stream);
                        }
                        var model = new DocumentViewModel
                        {
                            LibraryId = libraryId,
                            FileUrl = path,
                            Name = fileUrl.GetFilename(),
                            Description = "Demo"
                        };
                        Insert(model);
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
