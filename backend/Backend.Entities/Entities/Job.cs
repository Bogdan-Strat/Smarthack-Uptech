using Backend.Common;
using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class Job : IEntity
    {
        public Job()
        {
            Candidates = new HashSet<Candidate>();
        }

        public Guid JobId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int JobLevel { get; set; }
        public int JobType { get; set; }
        public Guid RecruiterId { get; set; }
        public int NrOfPositions { get; set; }
        public bool IsDeleted { get; set; }

        public virtual JobLevel JobLevelNavigation { get; set; } = null!;
        public virtual JobType JobTypeNavigation { get; set; } = null!;
        public virtual Recruiter Recruiter { get; set; } = null!;
        public virtual ICollection<Candidate> Candidates { get; set; }
    }
}
