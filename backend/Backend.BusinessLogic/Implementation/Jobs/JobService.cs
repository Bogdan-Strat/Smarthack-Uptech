using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Jobs.Models;
using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.Jobs
{
    public class JobService : BaseService
    {
        public JobService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public async Task AddJob(AddJobModel model)
        {
            var job = new Job()
            {
                JobId = Guid.NewGuid(),
                Title = model.JobTitle,
                Description = model.Description,
                JobLevel = model.JobLevelId,
                JobType = model.JobTypeId,
                Location = model.Location,
                NrOfPositions = model.NrOfPositions,
                IsDeleted = false,
            };

            UnitOfWork.Jobs.Insert(job);
            UnitOfWork.SaveChanges();


        }
    }
}
