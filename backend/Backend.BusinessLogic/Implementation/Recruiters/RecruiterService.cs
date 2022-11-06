using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Recruiters.Models;
using Backend.BusinessLogic.Implementation.Recruiters.Validation;
using Backend.Common.Extensions;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Recruiters
{
    public class RecruiterService : BaseService
    {
        private readonly AddRecruiterValidator AddRecruiterValidator;
        private readonly ChangePassswordValidator ChangePassswordValidator;
        private Guid currentuserId;
        public RecruiterService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            this.AddRecruiterValidator = new AddRecruiterValidator(UnitOfWork);
            this.ChangePassswordValidator = new ChangePassswordValidator(UnitOfWork);
        }

        public async Task AddRecruiter(AddRecruiterModel model)
        {

            AddRecruiterValidator.Validate(model).ThenThrow();

            var currentUser = await UnitOfWork.Recruiters
                .Get()
                .Where(r => r.RecruiterId == model.CurrentUserId)
                .FirstOrDefaultAsync();

           
            var newRecruiter = new Recruiter()
            {
                RecruiterId = Guid.NewGuid(),
                Email = model.Email,
                Salt = Guid.NewGuid(),
                FirstName = model.FirstName,
                LastName = model.LastName,
                CompanyId = currentUser.CompanyId,
                RoleId = 2,
                IsLoggedFirstTime = true
            };

            var password = model.FirstName + model.LastName + "Uptech";

            newRecruiter.Password = password.HashPassword((Guid)newRecruiter.Salt);

            UnitOfWork.Recruiters.Insert(newRecruiter);
            UnitOfWork.SaveChanges();
        }

        public async Task UpdatePassword(ChangePasswordModel model)
        {
            ChangePassswordValidator.Validate(model).ThenThrow();

            var recruiter = await UnitOfWork.Recruiters
                .Get()
                .Where(r => r.RecruiterId == model.CurrentUserId)
                .FirstOrDefaultAsync();

            currentuserId = model.CurrentUserId;

            recruiter.Password = model.NewPassword.HashPassword((Guid)recruiter.Salt);
            recruiter.IsLoggedFirstTime = false;

            UnitOfWork.Recruiters.Update(recruiter);
            UnitOfWork.SaveChanges();
        }

        public async Task<List<RecruiterPageModel>> GetRecruiters(GetAllRecruitersModel model)
        {
            var recruiter = await UnitOfWork.Recruiters
                .Get()
                .SingleOrDefaultAsync(r => r.RecruiterId == model.CurrentUserId);

            var recruiters = await UnitOfWork.Recruiters
                .Get()
                .Include(r => r.Role)
                .Include(r => r.Company)
                .Where(r => r.CompanyId == recruiter.CompanyId)
                .Select(r => new RecruiterPageModel()
                {
                    LastName = r.LastName,
                    FirstName = r.FirstName,
                    Role = r.Role.Role1,
                    Email = r.Email,
                    CompanyName = r.Company.Name,
                    IsLoggedFirstTime = r.IsLoggedFirstTime,
                })
                .ToListAsync();

            return recruiters;
        }

    }
}
