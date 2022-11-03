using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.BusinessLogic.Implementation.UserAccount.Validations;
using Backend.Common.DTOs;
using Backend.Common.Extensions;
using Backend.Entities;
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
        public UserAccountService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            this.registerValidator = new RegisterValidator(UnitOfWork);
        }

        public ServiceObjectModel RegisterNewUser(RegisterUserModel model)
        {
            ServiceObjectModel returnObj = new ServiceObjectModel();
            ExecuteInTransaction(uow =>
            {
                var res = registerValidator.Validate(model);
                if (!res.IsValid)
                {
                    var errorObject = new List<Tuple<string, string>>();

                    foreach (var error in res.Errors)
                    {
                        errorObject.Add(new Tuple<string, string>(error.PropertyName, error.ErrorMessage));
                    }

                    returnObj.Errors = errorObject;
                }
                else
                {
                    //de rezolvat automapperul
                    //var user = Mapper.Map<RegisterUserModel, User>(model);
                    var user = new User()
                    {
                        Id = Guid.NewGuid(),
                        Email = model.Email,
                        Salt = Guid.NewGuid(),
                        Username = model.Username
                    };

                    user.Password = model.Password.HashPassword((Guid)user.Salt);

                    uow.Users.Insert(user);

                    uow.SaveChanges();
                }
            });

            return returnObj;
        }

        public CurrentUserDto Login(string email, string password)
        {
            var currentUser = new CurrentUserDto();

            var user = UnitOfWork.Users.Get()
                        .FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                currentUser = new CurrentUserDto { IsAuthenticated = false };
            }

            var passwordHash = password.HashPassword((Guid)user.Salt);
            if (!passwordHash.SequenceEqual(user.Password))
            {
                currentUser = new CurrentUserDto { IsAuthenticated = false };
            }

            /*var userRoles = UnitOfWork.Users.Get()
                            .Where(u => u.Id == user.Id)
                            .SelectMany(u => u.Idroles.Select(r => r.Name))
                            .ToList();*/

            /*uow.Users.Update(user);
            uow.SaveChanges();*/

            currentUser = new CurrentUserDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                IsAuthenticated = true,
            };

            return currentUser;
        }

    }
}
