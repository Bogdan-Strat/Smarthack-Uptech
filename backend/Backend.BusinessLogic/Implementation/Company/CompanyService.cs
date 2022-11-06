using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Company.Models;
using Backend.BusinessLogic.Implementation.UserAccount.Validations;
using Backend.Common.DTOs;
using Backend.Common.Exceptions;
using Backend.Entities;
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

            foreach (var optionId in model.BuilderOptionIds)
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
