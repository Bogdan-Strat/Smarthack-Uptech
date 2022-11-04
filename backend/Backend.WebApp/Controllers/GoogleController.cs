using Backend.Common.Constants;
using Backend.DataAccess;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoogleController : BaseController
    {
        
        private readonly HttpClient Client;

        public GoogleController(ControllerDependencies dependencies, HttpClient client) : base(dependencies)
        {
            Client = client;
        }

        [HttpGet("getPlaces")]
        public async Task<IActionResult> GetPlaces(string searchPlace)
        {
            const string queryKey = Constants.ConnectionString;
            Client.BaseAddress = new Uri("https://google.com/api/");
            var response = await Client.GetAsync($"https://maps.googleapis.com/maps/api/place/autocomplete/json?key=putKey&input={searchPlace}");
            if (!response.IsSuccessStatusCode)
            {}
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}
