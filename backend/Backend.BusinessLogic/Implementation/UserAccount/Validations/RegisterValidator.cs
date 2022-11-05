using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.DataAccess;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserAccount.Validations
{
    public class RegisterValidator : AbstractValidator<RegisterUserModel>
    {
        private readonly UnitOfWork _unitOfWork;
        public RegisterValidator(UnitOfWork unitOfWork)
        {
            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Required field")
                .Must(EmailDoesntAlreadyExists).WithMessage("There is another account using this email, please use another one!")
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);

            RuleFor(r => r.Password)
                .Must(PasswordRegexTest).WithMessage("The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number")
                .NotEmpty().WithMessage("Required field");

            _unitOfWork = unitOfWork;
        }

        private bool PasswordRegexTest(string password)
        {
            if (password == null)
            {
                return false;
            }
            var pattern = @"(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}";
            Regex re = new Regex(pattern);
            var res = re.IsMatch(password);
            return res;
        }

        public bool EmailDoesntAlreadyExists(string email)
        {
            return !_unitOfWork.Recruiters.Get().Any(u => u.Email == email);
        }

    }
}
