using Backend.BusinessLogic.Implementation.Recruiters;
using Backend.BusinessLogic.Implementation.Recruiters.Models;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
      public class RecruiterController : BaseController
    {
        private readonly RecruiterService Service;
        public RecruiterController(ControllerDependencies dependencies, RecruiterService service) : base(dependencies)
        {
            Service = service;
        }

        [HttpPost("addRecruiter")]
        public async Task<IActionResult> AddRecruiter([FromBody] AddRecruiterModel model)
        {
            await Service.AddRecruiter(model);

            return Ok();
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            await Service.UpdatePassword(model);

            return Ok();
        }

        [HttpPost("getRecruiters")]
        public async Task<IActionResult> GetRecruiters([FromBody] GetAllRecruitersModel model)
        {
            var recruiters = await Service.GetRecruiters(model);

            return Ok(recruiters);
        }
    }
}
