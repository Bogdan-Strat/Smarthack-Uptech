using Backend.BusinessLogic;
using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Authorization;
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
            var obj = _service.RegisterNewUser(model);
            if (obj.Errors.Count == 0)
            {
                var user = _service.Login(model.Email, model.Password);
                await utils.LogIn(user, HttpContext);
                obj.CurrentUser = user;
            }

            return Ok(obj);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var user = _service.Login(email, password);
            if (user.IsAuthenticated)
            {
                await utils.LogIn(user, HttpContext);
            }

            return Ok(user);
        }

        /*[HttpGet("getCurrentUser")]
        [Authorize(AuthenticationSchemes = "BackendCookies")]
        public IActionResult GetCurrent()
        {
            return Ok(CurrentUser);
        }*/

    }
}
