using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using PracticalAssignment.Infrastructure.Exceptions;
using PracticalAssignment.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace PracticalAssignment.WebAPI.Infrastructure.Filters
{
    public class HttpGlobalExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            var responseModel = new ResponseModel();
            var errorModel = new ErrorModel();

            switch (exception)
            {
                case EntityNotFoundException _:
                    errorModel.ErrorCode = (int)HttpStatusCode.NotFound;
                    errorModel.Message = "The requested resource is not found. Please try another one.";

                    //Log.Error("DataNotFound exception has occurred. Details: {Exception}", exception.Message);
                    break;

                case AuthenticationException _:
                    errorModel.ErrorCode = (int)HttpStatusCode.Unauthorized;
                    errorModel.Message = exception.Message;

                    //Log.Error("Authentication exception has occurred. Details: {Exception}", exception.Message);
                    break;

                case ValidationException validationException:
                    errorModel.ErrorCode = (int)HttpStatusCode.BadRequest;
                    errorModel.Message = validationException.Errors.Aggregate((a, b) => a + "\n" + b);

                    //Log.Error("Validation exception has occurred. Details: {Exception}",
                        //JsonConvert.SerializeObject(new { error = validationException.Errors }));
                    break;

                case SqlException _:
                    errorModel.ErrorCode = (int)HttpStatusCode.BadRequest;
                    errorModel.Message = "Data exception has occurred.";

                    //Log.Error("SQL exception has occurred. Details: {Exception}", exception.Message);
                    break;

                default:
                    errorModel.ErrorCode = (int)HttpStatusCode.BadRequest;
                    errorModel.Message = "Internal Server Error";

                    //Log.Error("Internal server error has occurred. Details: {Exception}", exception);
                    break;
            }

            responseModel.Error = errorModel;
            context.Result = new JsonResult(responseModel);
            context.HttpContext.Response.StatusCode = errorModel.ErrorCode;
            context.ExceptionHandled = true;
        }
    }
}

