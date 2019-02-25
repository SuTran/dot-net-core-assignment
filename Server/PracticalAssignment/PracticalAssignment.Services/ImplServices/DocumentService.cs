using Microsoft.AspNetCore.Http;
using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.UnitOfWorks;
using PracticalAssignment.DTO.ViewModels;
using PracticalAssignment.Infrastructure.ContanstCommon;
using PracticalAssignment.Infrastructure.Extensions;
using PracticalAssignment.Infrastructure.LibCommon;
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
                .Where(x => x.LibraryId == libraryId)
                .Select(x => new DocumentOutputViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    FileUrl = x.FileUrl,
                    LibraryId = x.LibraryId,
                    Description = x.Description
                }).ToList();
            return query;
        }

        public void UploadFile(FileInputViewModel model, out bool status, out string message)
        {
            try
            {
                if (model.File == null || model.File.Length == 0)
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

                        if (!Directory.Exists(rootPath + libData.Name))
                        {
                            var folder = Directory.CreateDirectory(rootPath + libData.Name);
                        }
                        var newpath = Path.Combine(rootPath, libData.Name);

                        var path = Path.Combine(newpath, model.File.GetFilename());

                        //string[] typeFile = new[] { Path.GetExtension(model.FileUrl.FileName) }; 

                        if (!Validate.CheckFileType(path))
                        {
                            status = false;
                            message = MesssageContant.CHECK_FILE;
                        }
                        else
                        {
                            using (var stream = new FileStream(path, FileMode.Create))
                            {
                                model.File.CopyToAsync(stream);
                            }
                            var dto = new DocumentViewModel
                            {
                                LibraryId = model.LibraryId,
                                FileUrl = path,
                                Name = model.File.GetFilename(),
                                Description = model.Description
                            };
                            var data = Insert(dto);
                            status = data.Status;
                            message = MesssageContant.UPLOAD_SUCCESS;
                        }
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

        private Res Insert(DocumentViewModel dto)
        {
            try
            {
                if (dto.Name.Length > 255)
                {
                    return new Res()
                    {
                        Status = false,
                        Message = MesssageContant.VALIDATE_NAME
                    };
                }
                else if (dto.Name.Length > 255)
                {
                    return new Res()
                    {
                        Status = false,
                        Message = MesssageContant.VALIDATE_FILE_NAME
                    };
                }
                else
                {
                    var model = new Document
                    {
                        Id = Guid.NewGuid(),
                        Name = dto.Name,
                        FileUrl = dto.FileUrl,
                        Description = dto.Description,
                        LibraryId = dto.LibraryId
                    };

                    _uow.Documents.Insert(model);
                    _uow.Save();
                    return new Res()
                    {
                        Status = true,
                        Message = MesssageContant.SAVE_SUCCESS
                    };
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
