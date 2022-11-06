using Backend.BusinessLogic.Implementation.Recruiters.Models;
using Backend.Common.Extensions;
using Backend.DataAccess;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Recruiters.Validation
{
    public class ChangePassswordValidator : AbstractValidator<ChangePasswordModel>
    {
        private readonly UnitOfWork UnitOfWork;
        public ChangePassswordValidator(UnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;

            RuleFor(r => r.OldPassword)
                .Must((model, _, _) => IsOldPasswordCorrect(model.OldPassword ,model.CurrentUserId)).WithMessage("The old passwword is incorrect");

            RuleFor(r => r.NewPassword)
                .Must(PasswordRegexTest).WithMessage("The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number");


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
        private bool IsOldPasswordCorrect(string oldPassword, Guid currentUserId)
        {
            var currentUser = UnitOfWork.Recruiters
                .Get()
                .Where(r => r.RecruiterId == currentUserId)
                .FirstOrDefault();

            if (currentUser == null)
            {
                return false;
            }

            var oldPasswordHased = oldPassword.HashPassword((Guid)currentUser.Salt);

            return currentUser.Password.SequenceEqual(oldPasswordHased);


        }
    }
}
