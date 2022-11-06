using Backend.BusinessLogic.Base;
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
        /*
        public async Task<List<CandidateModel>> GetAllCandidates()
        {
            var candidates = await UnitOfWork.Candidates.Get().Select
        }
        */
    }
}
