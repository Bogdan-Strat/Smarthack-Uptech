using Backend.BusinessLogic.Implementation.Candidates;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidateController : BaseController
    {
        private readonly CandidateService _service;
        public CandidateController(ControllerDependencies dependencies, CandidateService service) : base(dependencies)
        {
            _service = service;
        }

        [HttpPost("postCandidateInfo")]
        public async Task<IActionResult> PostCandidateInfo([FromForm]CandidateInfoModel model)
        {
            var candidateToken = await _service.RegisterCandidate(model);

            return Ok(candidateToken);
        }

        [HttpPost("validateToken")]
        public async Task<IActionResult> ValidateToken([FromBody] string token)
        {
            var candidate = await _service.ValidateToken(Guid.Parse(token));

            return Ok(candidate);
        }

        //[HttpGet("getAllCandidates")]
        //public async Task<IActionResult> GetAllCandidates()
        //{
        //    // candidates = await _service.GetAllCandidates();
        //    //return Ok(candidates);
        //}
    }
}
