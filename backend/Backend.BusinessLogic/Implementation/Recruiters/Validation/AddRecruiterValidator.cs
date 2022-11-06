using Backend.BusinessLogic.Implementation.Recruiters.Models;
using Backend.DataAccess;
using FluentValidation;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Recruiters.Validation
{
    public class AddRecruiterValidator : AbstractValidator<AddRecruiterModel>
    {
        private readonly UnitOfWork _unitOfWork;
        public AddRecruiterValidator(UnitOfWork unitOfWork)
        {
            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Required field")
                .Must(EmailDoesntAlreadyExists).WithMessage("There is another account using this email, please use another one!")
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);

            RuleFor(r => r.CurrentUserId)
                .Must(IsCurrentUserAdmin).WithMessage("Unauthorized access");

            _unitOfWork = unitOfWork;
        }

        private bool IsCurrentUserAdmin(Guid currentUserId)
        {
            var currentUser = _unitOfWork.Recruiters
                .Get()
                .FirstOrDefault(r => r.RecruiterId == currentUserId);

            if (currentUser == null)
            {
                return false;
            }
            return currentUser.RoleId == 1;
        }

        public bool EmailDoesntAlreadyExists(string email)
        {
            return !_unitOfWork.Recruiters.Get().Any(u => u.Email == email);
        }

    }
}
