using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.Common.Extensions;
using Backend.DataAccess;
using Backend.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserAccount.Validations
{
    public class LoginValidator : AbstractValidator<LogInModel>
    {
        private readonly UnitOfWork _unitOfWork;
        public LoginValidator(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Required field")
                .Must(EmailDoesntAlreadyExists).WithMessage("There is another account using this email, please use another one!")
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);

            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Required field")
                .MustAsync((model, _, _) => IsPasswordCorrect(model.Email, model.Password)).WithMessage("Password is incorrect");
        }

        public async Task<bool> IsPasswordCorrect(string email, string password)
        {
            var user = await _unitOfWork.Users
                .Get()
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return false;
            }

            var passwordHash = password.HashPassword((Guid)user.Salt);

            return passwordHash.SequenceEqual(user.Password);
        }

        public bool EmailDoesntAlreadyExists(string email)
        {
            var emails = _unitOfWork.Users
                .Get()
                .Select(u => u.Email)
                .ToList();
            return _unitOfWork.Users.Get().Any(u => u.Email == email);
        }
    }
}
