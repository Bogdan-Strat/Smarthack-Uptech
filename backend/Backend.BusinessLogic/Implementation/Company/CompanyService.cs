using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.BuilderOption.Models;
using Backend.BusinessLogic.Implementation.Company.Models;
using Backend.BusinessLogic.Implementation.UserAccount.Validations;
using Backend.Common.DTOs;
using Backend.Common.Exceptions;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic
{
    public class CompanyService : BaseService
    {
        public CompanyService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {

        }

        public void UpdateCompany(UpdateCompanyModel model)
        {
            var company = new Company()
            {
                CompanyId = Guid.NewGuid(),
                Name = model.Name,
                Description = model.Description,
                Logo = model.Logo,
            };
            var length = model.BuilderOptionIds.Length;
            var optionsIds = model.BuilderOptionIds.Substring(1, length - 2);
            //optionsIds.Remove(optionsIds.Length - 2);
            if (optionsIds.Length > 0)
            {
                var ids = optionsIds.Split(',');
                var intIdsList = new List<int>();

                if (ids.Any())
                {
                    foreach (var id in ids)
                    {
                        intIdsList.Add(int.Parse(id));
                    }

                    foreach (var optionId in intIdsList)
                    {
                        var builderOption = UnitOfWork.BuilderOptions.Get().FirstOrDefault(b => b.BuilderOptionId == optionId);
                        company.BuilderOptions.Add(builderOption);
                    }

                    var recruiter = UnitOfWork.Recruiters.Get().FirstOrDefault(r => r.RecruiterId == model.CurrentUserId);

                    if (recruiter == null)
                    {
                        //throw new ValidationErrorException();
                    }

                    recruiter.CompanyId = company.CompanyId;

                    ExecuteInTransaction(uow =>
                    {
                        uow.Recruiters.Update(recruiter);
                        uow.Companies.Insert(company);
                        uow.SaveChanges();
                    });
                }
            }

        }

        public CompanyDetailsModel GetCompanyDetails(Guid companyId)
        {
            var company = UnitOfWork.Companies.Get().Include(c => c.BuilderOptions).FirstOrDefault(c => c.CompanyId == companyId);
            var options = new List<BuilderOptionModel>();
            foreach (var option in company.BuilderOptions)
            {
                var optionModel = new BuilderOptionModel
                {
                    BuilderOptionId = option.BuilderOptionId,
                    BuilderOptionMessage = option.BuilderOptionMessage,
                };
                options.Add(optionModel);
            }
            var model = new CompanyDetailsModel
            {
                CompanyId = company.CompanyId,
                Name = company.Name,
                Description = company.Description,
                Logo = company.Logo,
                BuilderOptions = options,
            };
            return model;
        }
    }
}
