using Backend.BusinessLogic.Implementation.Interviews;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InterviewController : BaseController
    {
        public InterviewController(ControllerDependencies dependencies) : base(dependencies)
        {
        }

        [HttpPost("addInterview")]
        public async Task<IActionResult> AddInterview([FromBody] NewInterviewModel model)
        {
            
            return Ok();
        }
    }
}
