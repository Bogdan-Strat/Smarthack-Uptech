using Backend.BusinessLogic.Base;
using Backend.BusinessLogic.Implementation.Jobs.Models;
using Backend.Common.DTOs;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

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

        public async Task<List<SelectListItemModel>> GetJobTypes()
        {
            return await UnitOfWork.JobTypes
                .Get()
                .Select(jt => new SelectListItemModel()
                {
                    Id = jt.JobTypeId,
                    Name = jt.JobType1
                })
                .ToListAsync();
        }

        public async Task<List<SelectListItemModel>> GetJobLevels()
        {
            return await UnitOfWork.JobLevels
                .Get()
                .Select(jl => new SelectListItemModel()
                {
                    Id = jl.JobLevelId,
                    Name = jl.JobLevel1
                })
                .ToListAsync();
        }

        public async Task<List<ViewJobModel>> GetAllJobs()
        {           
            var jobs = await UnitOfWork.Jobs.Get()
                .Include(j => j.JobTypeNavigation)
                .Include(j => j.JobLevelNavigation)
                .Select(j => new ViewJobModel
                {
                    JobId = j.JobId,
                    Title = j.Title,
                    Description = j.Description,
                    Location = j.Location,
                    JobLevel = j.JobLevelNavigation.JobLevel1,
                    JobType = j.JobTypeNavigation.JobType1,
                    NrOfPositions = j.NrOfPositions

                }).ToListAsync();

            return jobs;
        }
    }
}
