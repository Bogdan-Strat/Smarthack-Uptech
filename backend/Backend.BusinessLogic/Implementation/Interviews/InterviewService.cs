using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Interviews.Models;
using Backend.Common.Extensions;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
                var candidate = uow.Candidates
                .Get().FirstOrDefault(c => c.Email == model.CandidateEmail);

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

        public async Task<List<CandidateInterviewModel>> GetCandidateInterview(Guid candidateId)
        {
            var interviews = await UnitOfWork.Interviews.Get()
                .Where(i => i.CandidateToken == candidateId)
                .Select(i => new CandidateInterviewModel
                {
                    InterviewId = i.InterviewId,
                    StartDate = i.StartDate,
                    EndDate = i.EndDate,
                    InterviewLink = i.InterviewLink,
                    IsPassed = i.IsPassed,
                    CandidateToken = i.CandidateToken,
                })
                .ToListAsync();
            return interviews;
        }

        public async Task<List<CandidateInterviewModel>> GetRecruiterInterview(Guid recruiterId)
        {
            var interviews = await UnitOfWork.InterviewXrecruiters
                .Get()
                .Include(i => i.Interview)
                .Where(i => i.RecruiterId == recruiterId)
                .Select(i => new CandidateInterviewModel
                {
                    InterviewId = i.InterviewId,
                    StartDate = i.Interview.StartDate,
                    EndDate = i.Interview.EndDate,
                    InterviewLink = i.Interview.InterviewLink,
                    IsPassed = i.Interview.IsPassed,
                    CandidateToken = i.Interview.CandidateToken,
                }).ToListAsync();

            return interviews;
        }

    }
}
