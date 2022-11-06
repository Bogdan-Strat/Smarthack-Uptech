using Backend.BusinessLogic.Implementation.Jobs;
using Backend.BusinessLogic.Implementation.Jobs.Models;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class JobController : BaseController
    {
        private readonly JobService JobService;
        public JobController(ControllerDependencies dependencies, JobService jobService) : base(dependencies)
        {
            this.JobService = jobService;
        }

        [HttpPost("addJob")]
        public async Task<IActionResult> AaddJob(AddJobModel model)
        {
            await JobService.AddJob(model);

            return Ok();
        }
    }
}
