using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.BusinessLogic.Implementation.UserAccount.Validations;
using Backend.Common.DTOs;
using Backend.Common.Extensions;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic
{
    public class UserAccountService : BaseService
    {
        private readonly RegisterValidator registerValidator;
        private readonly LoginValidator loginValidator;
        public UserAccountService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            this.registerValidator = new RegisterValidator(UnitOfWork);
            this.loginValidator = new LoginValidator(UnitOfWork);
        }

        public void RegisterNewUser(RegisterUserModel model)
        {
            ExecuteInTransaction(uow =>
            {
                //registerValidator.Validate(model).ThenThrow();

                var recruiter = new Recruiter()
                {
                    RecruiterId = Guid.NewGuid(),
                    Email = model.Email,
                    Salt = Guid.NewGuid(),
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    CompanyId = Guid.Parse("e7ce478e-e34a-4b6f-bd90-d8b879c8e966"),
                    RoleId = 1,
                    IsLoggedFirstTime = false
                };

                recruiter.Password = model.Password.HashPassword((Guid)recruiter.Salt);

                uow.Recruiters.Insert(recruiter);

                uow.SaveChanges();
            });
        }

        public async Task<CurrentUserDto> Login(LogInModel model)
        {
            (await loginValidator.ValidateAsync(model)).ThenThrow();

            var currentUser = new CurrentUserDto();

            var recruiter = await UnitOfWork.Recruiters.Get()
                        .Include(r => r.Role)
                        .FirstOrDefaultAsync(u => u.Email == model.Email);
          

            currentUser = new CurrentUserDto
            {
                Id = recruiter.RecruiterId,
                Email = recruiter.Email,
                Name = recruiter.FirstName + " " + recruiter.LastName,
                Role = recruiter.Role.Role1,
                IsAuthenticated = true,
                IsLoggedFirst = recruiter.IsLoggedFirstTime
            };

            return currentUser;
        }

    }
}
