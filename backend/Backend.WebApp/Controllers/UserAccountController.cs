using Backend.BusinessLogic;
using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.Common.DTOs;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkoutBuddy.WebApp.Code.Utils;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserAccountController : BaseController
    {
        private readonly UserAccountService _service;
        private readonly AuthenticationUtils utils;
        public UserAccountController(ControllerDependencies dependencies, UserAccountService service) : base(dependencies)
        {
            _service = service;
            utils = new AuthenticationUtils();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserModel model)
        {
            _service.RegisterNewUser(model);
            var loginModel = new LogInModel()
            {
                Email = model.Email,
                Password = model.Password
            };
            var user = await _service.Login(loginModel);

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogInModel model)
        {
            var user = await _service.Login(model);

             return Ok(user);
        }
    }
}
