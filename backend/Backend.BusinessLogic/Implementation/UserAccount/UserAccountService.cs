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
            ServiceObjectModel returnObj = new ServiceObjectModel();
            ExecuteInTransaction(uow =>
            {
                registerValidator.Validate(model).ThenThrow();

                var user = new User()
                {
                    Id = Guid.NewGuid(),
                    Email = model.Email,
                    Salt = Guid.NewGuid(),
                    UserName = model.Username,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                };

                user.Password = model.Password.HashPassword((Guid)user.Salt);

                uow.Users.Insert(user);

                uow.SaveChanges();
            });
        }

        public async Task<CurrentUserDto> Login(LogInModel model)
        {
            (await loginValidator.ValidateAsync(model)).ThenThrow();

            var currentUser = new CurrentUserDto();

            var user = await UnitOfWork.Users.Get()
                        .FirstOrDefaultAsync(u => u.Email == model.Email);
          

            /*var userRoles = UnitOfWork.Users.Get()
                            .Where(u => u.Id == user.Id)
                            .SelectMany(u => u.Idroles.Select(r => r.Name))
                            .ToList();*/
             

            currentUser = new CurrentUserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.FirstName + " " + user.LastName,
                Username = user.UserName,
                IsAuthenticated = true,
            };

            return currentUser;
        }

    }
}
