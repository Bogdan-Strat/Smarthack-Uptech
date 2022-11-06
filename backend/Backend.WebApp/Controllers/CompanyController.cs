﻿using Backend.BusinessLogic;
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
        public async Task<IActionResult> GetBuilderOptions(UpdateCompanyModel model)
        {
            _service.UpdateCompany(model);

            return Ok(model);
        }
    }
}
