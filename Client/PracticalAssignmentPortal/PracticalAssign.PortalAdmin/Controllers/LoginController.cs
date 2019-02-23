using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PracticalAssign.PortalAdmin.Controllers
{
    [Route("pleskadmin")]
    public class LoginController : Controller
    {
        [Route("sign-in")]
        public IActionResult Index()
        {
            return View();
        }
    }
}