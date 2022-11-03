using Backend.DataAccess;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : BaseController
    {

        private readonly UnitOfWork _uow;

        public HomeController(ControllerDependencies dependencies, UnitOfWork uow) : base(dependencies)
        {
            _uow = uow;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            //var res = await _uow.Tests.Get().ToListAsync();
            return Ok();
        }
    }
}
