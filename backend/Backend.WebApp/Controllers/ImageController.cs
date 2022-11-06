using Backend.BusinessLogic.Implementation.Candidates;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : BaseController
    {
        private readonly CandidateService service;


        public ImageController(ControllerDependencies dependencies, CandidateService service) : base(dependencies)
        {
            this.service = service;
        }

        [HttpPost("transform")]
        public IActionResult GetImgContent([FromBody] string id)
        {
            var model = service.GetImgContent(id);

            return File(model, "image/jpg");
        }
    }
}
