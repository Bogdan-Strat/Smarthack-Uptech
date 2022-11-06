using Backend.BusinessLogic;
using Backend.BusinessLogic.Implementation.BuilderOption;
using Backend.BusinessLogic.Implementation.Company;
using Backend.BusinessLogic.Implementation.Company.Models;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    public class CompanyController : BaseController
    {
        private readonly CompanyService _service;
        public CompanyController(ControllerDependencies dependencies, CompanyService service) : base(dependencies)
        {
            _service = service;

        }

        [HttpPost("setCompanyOptions")]
        public async Task<IActionResult> GetBuilderOptions([FromForm]UpdateCompanyModel model)
        {
            _service.UpdateCompany(model);

            return Ok(model);
        }

        [HttpGet("getCompanyDetails")]

        public async Task<IActionResult> GetCompanyDetails(Guid companyId)
        {
  
            var model = _service.GetCompanyDetails(companyId);

            return Ok(model);
        }
    }
}
