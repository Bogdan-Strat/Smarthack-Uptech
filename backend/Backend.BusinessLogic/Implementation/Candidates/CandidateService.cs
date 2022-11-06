using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Candidates.Models;
using Backend.Common.Extensions;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Candidates
{
    public class CandidateService : BaseService
    {
        private readonly NewCandidateValidator newCandidateValidator;
        public CandidateService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            newCandidateValidator = new NewCandidateValidator(UnitOfWork);
        }

        public byte[] GetImgContent(string id)
        {
            return Encoding.ASCII.GetBytes(UnitOfWork.Cvs.Get().FirstOrDefault(c => c.CandidateToken == Guid.Parse(id)).Cv1);
        }

        public async Task<Guid> RegisterCandidate(CandidateInfoModel model)
        {
            var token = new Guid();
            ExecuteInTransaction(uow =>
            {
                newCandidateValidator.Validate(model).ThenThrow();

                var candidate = new Candidate()
                {
                    CandidateToken = Guid.NewGuid(),
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    JobId = Guid.Parse(model.JobId),
                };

                var cv = new Cv();
                cv.CandidateToken = candidate.CandidateToken;

                using (var ms = new MemoryStream())
                {
                    model.Cv.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    cv.Cv1 = fileBytes.ToString();
                }

                candidate.Cv = cv;

                uow.Candidates.Insert(candidate);
                uow.SaveChanges();

                token = candidate.CandidateToken;

            });
            return token;
        }

        public async Task<CandidateUserModel> ValidateToken(Guid token)
        {
            var candidate = await UnitOfWork.Candidates
                            .Get()
                            .FirstOrDefaultAsync(c => c.CandidateToken == token);

            var model = new CandidateUserModel()
            {
                CandidateToken= token,
                Name = candidate.FirstName + " " + candidate.LastName,
                Email = candidate.Email,
                IsAuthenticated = true
            };

            return model;
        }

        public List<CandidateModel> GetAllCandidates()
        {
            var candidates =  UnitOfWork.Candidates.Get()
                .Include(c => c.Job)
                .Include(c => c.Cv)
                .Select(c => new CandidateModel
                {
                    CandidateToken = c.CandidateToken,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    JobId = c.Job.JobId,
                    IsPassed = c.IsPassed,
                    JobTitle = c.Job.Title,
                    JobDescription = c.Job.Description,
                }).ToList();

            return candidates;

        }

        public CandidateModel GetCandidateById(Guid candidateToken)
        {
            var candidate = UnitOfWork.Candidates.Get()
                .Include(c => c.Job)
                .Include(c => c.Cv)
                .Select(c => new CandidateModel
                {
                    CandidateToken = c.CandidateToken,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    JobId = c.Job.JobId,
                    IsPassed = c.IsPassed,
                    JobTitle = c.Job.Title,
                    JobDescription = c.Job.Description,

                }).FirstOrDefault(c => c.CandidateToken == candidateToken);

            return candidate;
        }

    }
}
