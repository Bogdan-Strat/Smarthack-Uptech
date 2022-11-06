using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Interviews.Models;
using Backend.Common.Extensions;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;























































using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Interviews
{
    public class InterviewService : BaseService
    {
        private readonly NewInterviewValidator _newInterviewValidator;
        public InterviewService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            _newInterviewValidator = new NewInterviewValidator(UnitOfWork);
        }

        public async Task AddInterview(NewInterviewModel model)
        {
            ExecuteInTransaction(uow =>
            {
                _newInterviewValidator.Validate(model).ThenThrow();
                var candidate = uow.Candidates.Get().FirstOrDefault(c => c.Email == model.CandidateEmail);

                var interview = new Interview()
                {
                    InterviewId = Guid.NewGuid(),
                    StartDate = DateTime.Parse(model.StartDate),
                    EndDate = DateTime.Parse(model.EndDate),
                    InterviewLink = model.InterviewLink,
                    CandidateToken = candidate.CandidateToken
                };

                var recruiters = new List<InterviewXrecruiter>()
                {
                    new InterviewXrecruiter(){ RecruiterId = Guid.Parse(model.HRIntiator), InterviewId = interview.InterviewId},
                    new InterviewXrecruiter(){ RecruiterId = Guid.Parse(model.Recruiter), InterviewId = interview.InterviewId},
                };

                interview.InterviewXrecruiters = recruiters;

                uow.Interviews.Insert(interview);
                uow.SaveChanges();
            });
        }

        public async Task<List<CandidateInterviewModel>> GetAllCandidateInterviews(Guid candidateId)
        {
            var model = await UnitOfWork.Interviews.Get()
                .Select(i => new CandidateInterviewModel
                {
                    InterviewId = i.InterviewId,
                    StartDate = i.StartDate,
                    EndDate = i.EndDate,
                    InterviewLink = i.InterviewLink,
                    IsPassed = i.IsPassed,
                    CandidateToken = i.CandidateToken
                })
                .Where(i => i.CandidateToken == candidateId)
                .ToListAsync();
            return model;
        }
    }
}
