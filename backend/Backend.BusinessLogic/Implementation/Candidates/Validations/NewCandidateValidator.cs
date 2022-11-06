using Backend.DataAccess;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Candidates
{
    public class NewCandidateValidator : AbstractValidator<CandidateInfoModel>
    {
        private readonly UnitOfWork _uow;

        public NewCandidateValidator(UnitOfWork uow)
        {
            _uow = uow;
            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Required field")
                .Must(EmailDoesntAlreadyExists).WithMessage("There is another account using this email, please use another one!")
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);

        }

        private bool EmailDoesntAlreadyExists(string email)
        {
            var emails = _uow.Candidates
                .Get()
                .Select(u => u.Email)
                .ToList();
            return !_uow.Candidates.Get().Any(u => u.Email == email);
        }
    }
}
