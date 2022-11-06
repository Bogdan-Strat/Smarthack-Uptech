using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.BusinessLogic;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;
using WorkoutBuddy.WebApp.Code.Utils;
using Backend.BusinessLogic.Implementation.BuilderOption;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BuilderOptionController : BaseController
    {
        private readonly BuilderOptionService _service;
        public BuilderOptionController(ControllerDependencies dependencies, BuilderOptionService service) : base(dependencies)
        {
            _service = service;

        }

        [HttpGet("features")]
        public async Task<IActionResult> GetBuilderOptions()
        {
            var builderOptions = _service.GetBuilderOptions();

            return Ok(builderOptions);
        }
    }
}
