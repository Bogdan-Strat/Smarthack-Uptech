using Backend.DataAccess;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Interviews
{
    public class NewInterviewValidator : AbstractValidator<NewInterviewModel>
    {
        private readonly UnitOfWork uow;
        public NewInterviewValidator(UnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            RuleFor(r => r.CandidateEmail)
                .NotEmpty().WithMessage("Required field")
                .Must(EmailExists).WithMessage("There is no account using this email")
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);

        }

        public bool EmailExists(string email)
        {
            return uow.Candidates.Get().Any(u => u.Email == email);
        }
    }
}
