﻿using Backend.BusinessLogic.Implementation.Interviews;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InterviewController : BaseController
    {
        private readonly InterviewService _service;
        public InterviewController(ControllerDependencies dependencies, InterviewService service) : base(dependencies)
        {
            _service = service;
        }

        [HttpPost("addInterview")]
        public async Task<IActionResult> AddInterview([FromBody] NewInterviewModel model)
        {
            await _service.AddInterview(model);
            return Ok();
        }

        [HttpGet("getCandidateInterview")]
        public async Task<IActionResult> GetCandidateInterview(Guid candidateId)
        {
            var model = await _service.GetCandidateInterview(candidateId);
            return Ok(model);

        }

        [HttpGet("getRecruiterInterview")]
        public async Task<IActionResult> GetRecruiterInterview(Guid recruiterId)
        {
            var model = await _service.GetRecruiterInterview(recruiterId);
            return Ok(model);

        }
    }
}
